import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

import { User } from  './models/user';
import { JwtResponse } from  './models/jwt-response';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	isLoggedIn = false;

	AUTH_SERVER = "http://localhost:8000";
	authSubject = new BehaviorSubject(false);
	public currentUser: User;

	private token: string;

	constructor(private httpClient: HttpClient) { }

	register(user: User): Observable<JwtResponse> {
		return this.httpClient.post<JwtResponse>(`${this.AUTH_SERVER}/registerUser`, user).pipe(
			tap((res:  JwtResponse ) => {

				if (res.dataUser) {
					this.isLoggedIn = false;
					this.authSubject.next(true);
				}
				return res.dataUser.name;
			})

		);
	}

	singIn(user: User): Observable<JwtResponse> {
		return this.httpClient.post(`${this.AUTH_SERVER}/loginUser`, user).pipe(
			tap(async (res: JwtResponse) => {

				if(res.dataUser) {
					this.saveDataToken(res.dataUser.name, res.dataUser.email, res.dataUser.accessToken, res.dataUser.expiresIn);
					this.isLoggedIn = true;
					this.authSubject.next(true);
				}
				return user;
			})
		);
	}

	signOut(): void {
		// eliminar el token
		this.token = '';
		localStorage.removeItem("currentUser");
		localStorage.removeItem("ACCESS_TOKEN");
		localStorage.removeItem("EXPIRES_IN");
		// Ya NO se permite acceso a las rutas protegidas
		this.isLoggedIn = false;
		this.authSubject.next(false);
	}

	private saveDataToken(name: string, email: string, token: string, expiresIn: string): void {
		localStorage.setItem("currentUser", JSON.stringify({name: name, email: email}));
		localStorage.setItem("ACCESS_TOKEN", token);
		localStorage.setItem("EXPIRES_IN", expiresIn);
		this.token = token;
	}

	private getToken(): string {
		if (!this.token) {
			this.token = localStorage.getItem("ACCESS_TOKEN");
		}
		return this.token;
	}

	getCurrentUser(): any {
		if (!this.currentUser) {
			this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
		}
		return this.currentUser;
	}

}
