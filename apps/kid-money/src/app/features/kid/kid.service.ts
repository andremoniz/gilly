import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class KidService {
	constructor() {}

	createTransaction() {
		console.log('Create Transaction!');
	}

	editKid() {
		console.log('Edit Kid');
	}

	showChores() {
		console.log('Show Chores');
	}
}
