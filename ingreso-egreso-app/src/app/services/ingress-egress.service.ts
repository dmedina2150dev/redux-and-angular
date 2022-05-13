import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IngressEgress } from '../models/ingress-egress.model';
import { AuthService } from './auth.service';
import { map } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class IngressEgressService {

	constructor(
		private _auth: AuthService,
		private firestore: AngularFirestore,
	) { }

	created( ingressEgress: IngressEgress ) {
		const uid = this._auth.user?.uid;

		return this.firestore.doc(`${uid}/ingress-egress`)
				.collection('items')
				.add({ ... ingressEgress });
		
	}

	getAllListener(uid: string) {

		return this.firestore.doc(`${uid}/ingress-egress`)
			.collection(`items`)
			.snapshotChanges()
			.pipe(
				map( snapshot => snapshot.map( doc => ({ 
							uid: doc.payload.doc.id,
							... doc.payload.doc.data() as any 
						}))
			));
			//TODO: Es una opcion asi
			// .pipe( 
			// 	map( snapshot => {
			// 		return snapshot.map( doc => {
			// 			// const data: any = doc.payload.doc.data();
			// 			return { 
			// 				uid: doc.payload.doc.id,
			// 				// ... data
			// 				... doc.payload.doc.data() as any 
			// 			}
			// 		})
			// 	})
			// )
	}

	delete( uidItem: string ) {
		const uid = this._auth.user?.uid;

		return this.firestore.doc( `${ uid }/ingress-egress/items/${ uidItem }` )
			.delete();
	}
}
