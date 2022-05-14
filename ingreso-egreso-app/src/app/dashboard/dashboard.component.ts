import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import { IngressEgressService } from '../services/ingress-egress.service';
import { AppState } from '../state/app.state';
import { setItems } from '../state/ingress-egress/ingress-egress.actions';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styles: [
	]
})
export class DashboardComponent implements OnInit, OnDestroy{

	userSub$!: Subscription;
	itemSub$!: Subscription;

	constructor(
		private store: Store<AppState>,
		private ingresEgresService: IngressEgressService
	) { }
	

	ngOnInit(): void {
		this.userSub$ = this.store.select('user')
				.subscribe( user => {
					this.itemSub$ =
					this.ingresEgresService.getAllListener(user.uid)
					.subscribe( ingresEgresFB => {
						this.store.dispatch( setItems( { items: ingresEgresFB }) );
						 console.log(ingresEgresFB)
					});
				});
	}

	ngOnDestroy(): void {
		this.userSub$?.unsubscribe();
		this.itemSub$?.unsubscribe();
	}

}
