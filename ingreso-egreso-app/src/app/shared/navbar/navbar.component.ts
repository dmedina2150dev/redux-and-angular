import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AppState } from 'src/app/state/app.state';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styles: [
	]
})
export class NavbarComponent implements OnInit, OnDestroy {


	user!: User;
	user$!: Subscription;


	constructor(
		private store: Store<AppState>
	) { }

	ngOnInit(): void {
		this.user$ = this.store.select('user')
			.subscribe( (user: User) => this.user = user )
	}

	ngOnDestroy(): void {
		this.user$.unsubscribe();
	}

}
