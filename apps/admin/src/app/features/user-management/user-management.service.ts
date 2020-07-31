import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@entities';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from './../../../environments/environment';

interface TreeNodeInterface {
	key: number;
	name: string;
	role?: string;
	email?: string;
	expand?: boolean;
	level?: number;
	children?: TreeNodeInterface[];
	parent?: TreeNodeInterface;
}

@Injectable()
export class UserManagementService {
	users: User[] = [];
	users$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

	constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
		this.getAllUsers().subscribe();
	}

	getAllUsers(): Observable<User[]> {
		return this.http.get<User[]>(`${environment.serverUrl}/user`).pipe(
			tap((res) => {
				this.users = res.map((r) => new User(r));
				this.users$.next(this.users);
			})
		);
	}

	getUser(id: string) {
		return this.http.get<User>(`${environment.serverUrl}/user/${id}`);
	}

	saveUser(user: User) {
		if (user.id) {
			this.http.patch(`${environment.serverUrl}/user/${user.id}`, user).subscribe((res) => {
				let updateUser = this.users.find((u) => u.id === user.id);
				delete user.password;
				updateUser = { ...user };
				this.users$.next(this.users);
			});
		} else {
			this.http.post(`${environment.serverUrl}/user`, user).subscribe((res) => {
				this.users.push(new User(res));
				this.users$.next(this.users);
			});
		}
	}

	deleteUser(user: User) {
		if (confirm(`Are you sure you want to delete this user ${user.username}?`)) {
			this.http.delete(`${environment.serverUrl}/user/${user.id}`).subscribe((res) => {
				this.users = this.users.filter((u) => u.id !== user.id);
				this.users$.next(this.users);
			});
		}
	}
}
