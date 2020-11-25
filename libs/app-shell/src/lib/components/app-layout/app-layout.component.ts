import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { MenuItem } from 'primeng/api/menuitem';

import {
	CompletionMessage,
	DataService
} from '../../../../../data/src/lib/services/data/data.service';
import { AuthService } from '../../services/auth.service';
import { MetricsService } from '../../services/metrics.service';

export enum HeaderItemType {
	Link = 'a',
	Button = 'button',
	Menu = 'menu',
	Divider = 'divider',
	Text = 'text'
}

export interface HeaderItemConfig {
	name: string;
	type: HeaderItemType;
	roles?: string[];
	linkLocation?: string;
	menuItems?: Partial<MenuItem | { roles?: string[] }>[];
	buttonHandler?: () => void;
}

@Component({
	selector: 'lib-app-layout',
	templateUrl: './app-layout.component.html',
	styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent implements OnInit {
	@Input() appTitle: string;
	@Input() appLogo: string;

	@Input() headerItems: HeaderItemConfig[];

	@Input() hideHeader: boolean;
	@Input() fluidMain: boolean = true;

	_helpContacts: any[];
	@Input()
	set helpContacts(contacts: { name: string; email: string; phone: string }[]) {
		if (!contacts) return;

		this._helpContacts = contacts.map((c) => {
			return { label: `${c.name} <a>Test</a>` };
		});
	}
	get helpContacts() {
		return this._helpContacts;
	}

	nonAuthItems: HeaderItemConfig[] = [
		{ type: HeaderItemType.Link, linkLocation: '/login', name: 'Login' }
	];
	authItems: HeaderItemConfig[] = [
		{
			type: HeaderItemType.Menu,
			name: this.auth.getUser() ? this.auth.getUser().username : '',
			menuItems: [
				{
					label: 'Admin',
					url: `${location.origin}/admin`,
					roles: ['superadmin', 'admin']
				},
				{
					label: 'Profile',
					url: '/user/profile'
				},
				{
					label: 'Logout',
					command: () => {
						this.auth.logout();
					}
				}
			]
		}
	];

	currentRoute: string;

	constructor(
		public auth: AuthService,
		public router: Router,
		private messageService: MessageService,
		private metricsService: MetricsService,
		private dataService: DataService,
		private primengConfig: PrimeNGConfig
	) {
		this.auth.userLoggedIn$.subscribe((user) => {
			if (user) {
				this.authItems[0].name = user.username;
			}
		});

		this.metricsService.enableMetrics();

		this.dataService.completionMessage$.subscribe((message: CompletionMessage) => {
			if (!message) return;

			this.messageService.add({
				key: 'appToast',
				severity: message.severity,
				summary: message.summary,
				detail: message.detail
			});
		});

		this.primengConfig.ripple = true;
	}

	ngOnInit(): void {}
}
