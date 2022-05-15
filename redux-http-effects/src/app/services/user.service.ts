import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	private url: string  = 'https://reqres.in/api';

	constructor(private _http: HttpClient) { }

	getAll() {
		return this._http.get(`${this.url}/users?per_page=6`)
			.pipe(
				map( (response: any) => response['data'] )
			);
	}
}
