import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import * as ui from 'src/app/state/ui/ui.actions';

import { AuthService } from 'src/app/services/auth.service';

import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styles: [
	]
})
export class LoginComponent implements OnInit, OnDestroy {
	loginForm!: FormGroup;
	loading: boolean = false;
	uiSubscription$!: Subscription;

	constructor(
		private fb: FormBuilder,
		private _auth: AuthService,
		private _router: Router,
		private store: Store<AppState>
	) { }

	ngOnInit(): void {
		this.loginForm = this.fb.group({
			email: ['', [Validators.email, Validators.required]],
			password: ['', [Validators.required]]
		});

		this.uiSubscription$ = this.store.select('ui').subscribe( ui => this.loading = ui.isLoading );
	}

	ngOnDestroy(): void {
		this.uiSubscription$.unsubscribe();
		
	}

	login() {
		if (this.loginForm.invalid) {
			return;
		}
		
		this.store.dispatch( ui.isLoading() );

		this._auth.login(this.loginForm.value)
			.then(credentials => {
				console.log(credentials)
	
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
