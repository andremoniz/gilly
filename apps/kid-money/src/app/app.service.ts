import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api/menuitem';
import { filter, map } from 'rxjs/operators';

import { capitalizeFirstLetter } from './../../../../libs/utilities/src/lib/utilities/strings/capitalizeFirstLetter';

@Injectable({ providedIn: 'root' })
export class AppService {
	breadcrumbs: MenuItem[];
	home: MenuItem;

	constructor(private route: ActivatedRoute, private router: Router) {
		this.home = { icon: 'pi pi-home', routerLink: '/' };
		this.breadcrumbs = [];

		this.router.events
			.pipe(
				filter((event) => event instanceof NavigationEnd),
				map(() => this.route),
				map((route) => route.firstChild),
				map((route) => route.snapshot)
			)
			.subscribe((routeSnapshot: any) => {
				this.breadcrumbs = [];

				const routerParts = routeSnapshot._routerState.url
					.split('/')
					.filter((p) => p && p !== '' && p !== 'home');

				this.breadcrumbs = routerParts.map((part, i) => {
					let routerLink = '';
					for (let p = 0; p <= i; p++) {
						routerLink += `/${routerParts[p]}`;
					}

					return {
						label: capitalizeFirstLetter(part),
						routerLink: routerLink
					};
				});
			});
	}
}
