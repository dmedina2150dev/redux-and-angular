import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { IngressEgress } from '../models/ingress-egress.model';
import { IngressEgressService } from '../services/ingress-egress.service';
import { AppState } from '../state/app.state';
import { isLoading, stopLoading } from '../state/ui/ui.actions';

@Component({
	selector: 'app-ingress-egress',
	templateUrl: './ingress-egress.component.html',
	styles: [
	]
})
export class IngressEgressComponent implements OnInit, OnDestroy {

	ingressForm!: FormGroup;
	type: string = 'ingreso';
	loading: boolean = false;
	isLoadingSubscription$!: Subscription;

	constructor(
		private store: Store<AppState>,
		private fb: FormBuilder,
		private ingresEgresService: IngressEgressService
	) { }
	
	ngOnInit(): void {

		this.ingressForm =  this.fb.group({
			description: ['', [ Validators.required ]],
			amount: ['', [ Validators.required ]]
		});

		this.isLoadingSubscription$ = this.store.select('ui')
			.subscribe( ui => this.loading = ui.isLoading );
	}

	ngOnDestroy(): void {
		this.isLoadingSubscription$.unsubscribe();
	}


	save() {
		
		if (this.ingressForm.invalid) { return; }
		
		this.store.dispatch( isLoading() );
		
		const { description, amount } = this.ingressForm.value;
		const ingressEgress = new IngressEgress(description, amount, this.type);

		this.ingresEgresService.created(ingressEgress)
		.then( () => {
			Swal.fire({
				icon: 'success',
				title: 'Exitoso',
				text: 'Se ha guardado el registro'
			});
			this.ingressForm.reset();
			this.store.dispatch( stopLoading() );
		} )
		.catch( err => {
			this.store.dispatch( stopLoading() );
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: err.message
			});
		} );

	}

}
