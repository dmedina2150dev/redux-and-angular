import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styles: [
	]
})
export class NavbarComponent implements OnInit {
	@ViewChild('txtInput') txtInput: any;
	
	constructor(
		private router: Router
	) { }

	ngOnInit(): void {
	}

	goToUser(id: string) {
		if (!id) {
			return;
		}

		this.router.navigate([`user/`, id]);

	} 

}
