import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { AppState } from 'src/app/state/app.state';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styles: [
	]
})
export class SidebarComponent implements OnInit, OnDestroy {

	user!: User;
	user$!: Subscription;

	constructor(
		private _auth: AuthService,
		private _router: Router,
		private store: Store<AppState>
	) { }

	ngOnInit(): void {
		this.user$ = this.store.select('user')
			.subscribe( (user: User) => this.user = user )
	}

	ngOnDestroy(): void {
		this.user$.unsubscribe();
	}

	logout() {
		this._auth.logout()
			.then(res => {
				this._router.navigate(['/login']);
			})
	}
}
