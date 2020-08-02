import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class KidService {
	constructor() {}

	createTransaction() {
		console.log('Create Transaction!');
	}

	showChores() {
		console.log('Show Chores');
	}
}
