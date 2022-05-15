import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styles: [],
})
export class ListComponent implements OnInit, OnDestroy {

	users!: User[];
	users$!: Subscription;


	constructor(private userService: UserService) { }

	ngOnInit(): void {
		this.users$ = this.userService.getAll().subscribe( ( users: User[] ) => this.users = users );
	}

	ngOnDestroy(): void {
		this.users$?.unsubscribe();
	}
}
