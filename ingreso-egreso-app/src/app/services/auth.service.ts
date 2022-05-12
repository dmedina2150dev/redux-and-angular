import { Injectable } from '@angular/core';
import { UserCreated, UserSignin } from '../interfases/user.interface';
import { 
	Auth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	authState
} from '@angular/fire/auth';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

import { map } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(
		public auth: Auth,
		public firestore: Firestore
	) { }

	iniAuthListener() { 
		return authState(this.auth);
	}

	crearUsuario({ nombre, email, password}: UserCreated): Promise<any> {
		return createUserWithEmailAndPassword( this.auth ,email, password)
			.then( ({ user }) => {

				const newUser = new User( user.uid, nombre, user.email );
				const userRef = collection(this.firestore, `user`);
				
				return addDoc( userRef , {...newUser} );
		
			})

	}

	login({email , password}: UserSignin) {
		return signInWithEmailAndPassword( this.auth ,email, password);
	}

	logout() {
		return signOut(this.auth);
	}

	isAuth() {
		return authState(this.auth).pipe(
			map( fUser => fUser != null )
		);
	}

}
