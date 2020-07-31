import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
	expectedRoles?: string[];
	linkLocation?: string;
	menuItems?: HeaderItemConfig[];
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

	nonAuthItems: HeaderItemConfig[] = [
		{ type: HeaderItemType.Link, linkLocation: '/login', name: 'Login' }
	];
	authItems: HeaderItemConfig[] = [
		{
			type: HeaderItemType.Menu,
			name: this.auth.getUser() ? this.auth.getUser().username : '',
			menuItems: [
				{
					type: HeaderItemType.Text,
					name: 'Admin',
					expectedRoles: ['admin', 'superadmin'],
					linkLocation: `${location.origin}/admin`
				},
				{
					type: HeaderItemType.Text,
					name: 'Profile',
					linkLocation: '/user/profile'
				},
				{
					type: HeaderItemType.Button,
					name: 'Logout',
					buttonHandler: this.auth.logout.bind(this)
				}
			]
		}
	];

	currentRoute: string;

	constructor(
		public auth: AuthService,
		private metricsService: MetricsService,
		public router: Router
	) {
		this.auth.userLoggedIn$.subscribe((user) => {
			this.authItems[0].name = user.username;
			this.router.navigate(['']);
		});

		this.metricsService.enableMetrics();
	}

	ngOnInit(): void {}
}
