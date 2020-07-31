import { NgNotificationService } from './../../../../libs/app-shell/src/lib/services/ng-notification.service';
import { Component } from '@angular/core';
import { AuthService, HeaderItemConfig, HeaderItemType } from '@lib/app-shell';

import { environment } from '../environments/environment';

@Component({
	selector: 'gilly-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	appTitle = environment.appTitle;
	appLogo = environment.appLogo;
	headerItems: HeaderItemConfig[] = [
		{ type: HeaderItemType.Link, linkLocation: '/user-management', name: 'User Management' },
		{ type: HeaderItemType.Link, linkLocation: '/metrics', name: 'Metrics' },
		{ type: HeaderItemType.Link, linkLocation: '/form-editor', name: 'Field Editor' },
		{ type: HeaderItemType.Link, linkLocation: '/data-tools', name: 'Data Tools' }
	];

	constructor(public auth: AuthService, private ngNotificationService: NgNotificationService) {
		this.ngNotificationService.listenSuccess();
	}
}
