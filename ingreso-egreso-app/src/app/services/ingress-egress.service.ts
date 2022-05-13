import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { IngressEgress } from '../models/ingress-egress.model';

@Injectable({
	providedIn: 'root'
})
export class IngressEgressService {

	constructor(
		public firestore: Firestore,
	) { }

	created( ingressEgress: IngressEgress ) {
		
	}
}
