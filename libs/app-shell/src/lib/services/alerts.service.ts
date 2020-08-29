import { Injectable } from '@angular/core';

@Injectable()
export class AlertsService {
	constructor() {}

	openAlert(msg: string, duration?: number) {
		alert(msg);
	}
}
