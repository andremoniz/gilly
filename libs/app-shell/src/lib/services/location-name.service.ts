import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class LocationNameService {
	locationName$ = new Subject();

	constructor() {}
}
