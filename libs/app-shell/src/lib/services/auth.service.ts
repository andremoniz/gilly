import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@entities';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AppShellModuleConfig } from '../app-shell.module';
import { checkUserRole } from './../../../../utilities/src/lib/auth/checkUserRole';

@Injectable()
export class AuthService {
	private config: AppShellModuleConfig;

	private user: User;

	userLoggedIn$ = new BehaviorSubject<User>(null);

	userExpiredCheck;
	updateUserExpired;

	constructor(
		private http: HttpClient,
		private router: Router,
		@Inject('config') config: AppShellModuleConfig
	) {
		this.config = config;

		if (this.getUser()) {
			this.userLoggedIn$.next(this.getUser());
		}
		// this.userExpiredCheck = setInterval(() => { // Check every minute if user is still valid, if not then boot 'em
		//   if (!this.user || this.isUserExpired) {
		//     this.logout();
		//   }
		// }, 60 * 1000);
	}

	handleLogin(login: { username: string; password: string }) {
		return this.http
			.post(this.config.securityEndpoint, login)
			.pipe(tap((user: User) => this.setUserFromServer(user)));
	}

	isUserExpired() {
		return new Date(this.user.expiry).getTime() < new Date().getTime();
	}

	setUser(user) {
		if (!user) return;

		this.user = user;
		localStorage.setItem('dakimbo_login', JSON.stringify(this.user));
		if (user) {
			// if we have a user, then setup the expiry to auto update every minute
			this.updateUserExpired = setInterval(() => {
				this.user.expiry = new Date(new Date().getTime() + 60 * 60 * 1 * 1000);
				localStorage.setItem('dakimbo_login', JSON.stringify(this.user));
			}, 60 * 1000);

			this.userLoggedIn$.next(user);
		}
	}

	getUser(): User {
		const storedUser: User = JSON.parse(localStorage.getItem('dakimbo_login'));

		if (!storedUser) {
			return null;
		}

		if (new Date(storedUser.expiry) < new Date()) {
			this.logout();
			return null;
		}

		this.user = new User(storedUser);
		return this.user;
	}

	getUserRoles(): string[] {
		return (this.getUser().roles || []).map((r) => r.role);
	}

	isUserAdmin(): boolean {
		return this.getUserRoles().some((r) => ['superadmin', 'admin'].includes(r.toLowerCase()));
	}

	setUserFromServer(res: User) {
		const newUser = res;
		newUser.jwt = res.jwt;
		newUser.expiry = new Date(new Date().getTime() + 60 * 60 * 1 * 1000); // set expiration to one hour later;
		this.setUser(newUser);

		this.router.navigate(['/']);
	}

	logout() {
		this.user = null;
		clearInterval(this.updateUserExpired);
		localStorage.removeItem('dakimbo_login');
		this.router.navigate(['/']);
	}

	isAuthenticated() {
		return this.getUser() !== null;
	}

	isActionAuthorized(action: string, expectedRoles?: string[]) {
		if (!expectedRoles || !expectedRoles.length) return true;
		return checkUserRole(this.getUser(), expectedRoles);
	}

	handleUnauthorized() {
		this.user = null;
		clearInterval(this.updateUserExpired);
		localStorage.removeItem('dakimbo_login');
		this.router.navigate(['not-authorized']);
	}

	async getLoggedInUserInfo(): Promise<User> {
		try {
			const res = await fetch(`/user/me`, {
				headers: {
					Authorization: `Bearer ${this.getUser().jwt}`
				}
			});
			return await res.json();
		} catch (error) {
			console.log(error);
			return null;
		}
	}
}
