import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { 
	Auth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	authState
} from '@angular/fire/auth';
import { Firestore, collection, getDoc, doc, setDoc } from '@angular/fire/firestore';

import { UserCreated, UserSignin } from '../interfases/user.interface';
import { User } from '../models/user.model';

import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import * as authAction from '../state/auth/auth.actions';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	private _user!: User | null;

	get user() {
		return this._user;
	}

	constructor(
		public auth: Auth,
		public firestore: Firestore,
		private store: Store<AppState>
	) { }

	iniAuthListener() { 
		return authState(this.auth).subscribe( fUser => {
			
			if ( fUser ) {
				this.getUser(fUser.uid)
					.then( userFirebase => {
						const user= User.fromFirebase( userFirebase );
						this._user = user;
						this.store.dispatch( authAction.setUser({ user }) )
					})
					.catch( error => console.error(error) )
				
			} else {
				console.log("No habia usuario logueado")
				this._user = null;
				this.store.dispatch( authAction.unSetUser() )
			}

		});
	}

	async crearUsuario({ nombre, email, password}: UserCreated): Promise<any> {
		return await createUserWithEmailAndPassword( this.auth , email, password)
			.then( ({ user }) => {

				const userRef = collection(this.firestore, `${user.uid}`);
				const document = doc(userRef, 'user');
				return setDoc( document , { uid: user.uid, nombre, email: user.email } );
	
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

	async getUser(uid: string) {
		const docRef = doc(this.firestore, `${uid}`, 'user');
		const docSnap = await getDoc(docRef);
		
		if(!docSnap.exists()) {
			return null;

		}
		
		return docSnap.data();
	}

}
