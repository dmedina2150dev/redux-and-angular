import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
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
		private store: Store<AppState>
	) { }
	

	ngOnInit(): void {

		this.ingressEgressSub$ = this.store.select('ingressEgress')
			.subscribe( (res) => {
				this.ingressEgress = res.items;
				console.log( typeof this.ingressEgress)
			} );
	}

	ngOnDestroy(): void {
		this.ingressEgressSub$.unsubscribe();
	}

}
