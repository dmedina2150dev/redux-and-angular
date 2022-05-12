import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styles: [
	]
})
export class LoginComponent implements OnInit {
	loginForm!: FormGroup;

	constructor(
		private fb: FormBuilder,
		private _auth: AuthService,
		private _router: Router
	) { }

	ngOnInit(): void {
		this.loginForm = this.fb.group({
			email: ['', [Validators.email, Validators.required]],
			password: ['', [Validators.required]]
		});
	}

	login() {
		if (this.loginForm.invalid) {
			return;
		}

		Swal.fire({
			title: 'Espere por favor',
			didOpen: () => {
				Swal.showLoading()			
			}
		});

		this._auth.login(this.loginForm.value)
			.then(credentials => {
				console.log(credentials)
				Swal.close();
				this._router.navigate(['/']);
			})
			.catch(error => {
				console.error(error)
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: error.message
				});
			});
	}

}
