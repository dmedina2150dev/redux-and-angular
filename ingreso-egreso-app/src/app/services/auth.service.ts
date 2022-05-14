import { Injectable } from '@angular/core';
import { map, Subscription } from 'rxjs';

import { UserCreated, UserSignin } from '../interfases/user.interface';
import { User } from '../models/user.model';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import * as authAction from '../state/auth/auth.actions';
import * as ingreEgreActions from '../state/ingress-egress/ingress-egress.actions';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	
	userSubscription!: Subscription;

	private _user!: User | null;

	get user() {
		return this._user;
	}

	constructor(
		public auth: AngularFireAuth,
		public firestore: AngularFirestore,
		private store: Store<AppState>
	) { }

	iniAuthListener() { 
		this.auth.authState.subscribe( fUser => {

			if (fUser) {
				
				this.userSubscription = this.firestore.doc(`${ fUser.uid }/user`)
					.valueChanges()
					.subscribe( ( firestoreUser: any ) => {
						this._user = firestoreUser;
						const user = User.fromFirebase( firestoreUser );
						this.store.dispatch( authAction.setUser({ user }));
					})
			} else {
				this.userSubscription?.unsubscribe();
				this._user = null;
				this.store.dispatch( authAction.unSetUser() );
				this.store.dispatch( ingreEgreActions.unSetItems() );
			}

		})

	}

	async crearUsuario({ nombre, email, password}: UserCreated): Promise<any> {
		
		return this.auth.createUserWithEmailAndPassword( email, password )
			.then( ({ user }: any) => {
				const newUser = new User( user.uid, nombre, user?.email );

				this.firestore.doc(`${ newUser.uid }/user`)
					.set( { ... newUser } );
			})

	}

	login({email , password}: UserSignin) {
		return this.auth.signInWithEmailAndPassword( email, password );
	}

	logout() {
		return this.auth.signOut();
	}

	isAuth() {
		return this.auth.authState.pipe(
			map( fbUser => fbUser != null )
		);
	}

}
