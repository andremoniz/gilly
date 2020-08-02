import { Injectable } from '@angular/core';
import { Kid } from '@entities';
import { DataService } from '@lib/data';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class KidService {
	constructor() {}

	createTransaction() {
		console.log('Create Transaction!');
	}
}
