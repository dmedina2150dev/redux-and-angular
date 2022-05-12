import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styles: [
	]
})
export class RegisterComponent implements OnInit {

	registerForm!: FormGroup;

	constructor(
		private fb: FormBuilder,
		private _auth: AuthService,
		private _router: Router) { }

	ngOnInit(): void {
		this.registerForm = this.fb.group({
			nombre: [ '', Validators.required ],
			email: [ '', [Validators.required, Validators.email] ],
			password: [ '', Validators.required ],
		})
	}

	crearUsuario() {
		if(this.registerForm.invalid ) { return; }
		
		const { nombre, email, password } = this.registerForm.value;

		Swal.fire({
			title: 'Espere por favor',
			didOpen: () => {
				Swal.showLoading()			
			}
		});

		this._auth.crearUsuario({nombre, email, password})
			.then( credenciales => {
				console.log(credenciales)
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
