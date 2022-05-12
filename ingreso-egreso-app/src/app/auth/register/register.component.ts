import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import * as ui from 'src/app/state/ui.actions';

import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styles: [
	]
})
export class RegisterComponent implements OnInit, OnDestroy {

	registerForm!: FormGroup;
	loading: boolean = false;
	uiSubscription!: Subscription;

	constructor(
		private fb: FormBuilder,
		private _auth: AuthService,
		private _router: Router,
		private store: Store<AppState>
		) { }

	ngOnInit(): void {
		this.registerForm = this.fb.group({
			nombre: [ '', Validators.required ],
			email: [ '', [Validators.required, Validators.email] ],
			password: [ '', Validators.required ],
		});

		this.uiSubscription = this.store.select('ui').subscribe( ui => this.loading = ui.isLoading );
	}

	ngOnDestroy(): void {
		this.uiSubscription.unsubscribe();
		
	}

	crearUsuario() {
		if(this.registerForm.invalid ) { return; }
		
		const { nombre, email, password } = this.registerForm.value;

		this.store.dispatch( ui.isLoading() );

		this._auth.crearUsuario({nombre, email, password})
			.then( credenciales => {
				console.log(credenciales)

				this.store.dispatch( ui.stopLoading() );
				
				this._router.navigate(['/']);
			})
			.catch(error => {
				console.error(error)
				
				this.store.dispatch( ui.stopLoading() );
				
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: error.message
				});
			});
	}

}
