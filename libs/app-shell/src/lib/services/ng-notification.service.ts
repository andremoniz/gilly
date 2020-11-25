import { Injectable } from '@angular/core';
import {
	EntityServiceAction,
	NgEntityServiceNotifier,
	ofType
} from '@datorama/akita-ng-entity-service';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class NgNotificationService {
	constructor(
		private messageService: MessageService,
		private notifier: NgEntityServiceNotifier
	) {}

	listenSuccess() {
		this.notifier.action$.pipe(ofType('success')).subscribe((action: EntityServiceAction) => {
			if (action.method === 'GET') return;

			this.messageService.add({
				key: 'appToast',
				life: 1500,
				severity: 'success',
				summary: 'Success',
				detail: `${action.storeName} successfully ${this.getHumanMethodName(
					action.method
				)}!`,
			});
		});
	}

	private getHumanMethodName(method: string) {
		let msg = '';
		switch (method) {
			case 'GET':
				msg = 'retrieved';
				break;
			case 'POST':
				msg = 'created';
				break;
			case 'PUT':
				msg = 'saved';
				break;
			case 'DELETE':
				msg = 'deleted';
				break;
			default:
				msg = '';
				break;
		}
		return msg;
	}
}
