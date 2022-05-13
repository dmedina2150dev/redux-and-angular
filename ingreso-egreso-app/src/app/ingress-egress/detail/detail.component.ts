import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IngressEgressService } from 'src/app/services/ingress-egress.service';
import Swal from 'sweetalert2';
import { IngressEgress } from '../../models/ingress-egress.model';
import { AppState } from '../../state/app.state';

@Component({
	selector: 'app-detail',
	templateUrl: './detail.component.html',
	styles: [
	]
})
export class DetailComponent implements OnInit, OnDestroy {

	ingressEgressSub$!: Subscription;
	ingressEgress!: IngressEgress[];

	constructor(
		private store: Store<AppState>,
		private ingresEgresService: IngressEgressService
	) { }
	

	ngOnInit(): void {

		this.ingressEgressSub$ = this.store.select('ingressEgress')
			.subscribe( (res) => {
				this.ingressEgress = res.items;
			} );
	}

	ngOnDestroy(): void {
		this.ingressEgressSub$.unsubscribe();
	}

	delete( uid: string | undefined ) {
		console.log(uid)
		if (uid === undefined) { return; }

		this.ingresEgresService.delete( uid )
			.then(( ) => {
				Swal.fire({
					icon: 'success',
					title: 'Eliminado',
					text: 'Registro borrado'
				});
			})
			.catch( (err) => {
				Swal.fire({
					icon: 'error',
					title: 'Error Eliminando',
					text: 'Registro no se ha borrado' + err
				});
			})
	}

}
