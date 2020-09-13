import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';

@Injectable({ providedIn: 'root' })
export class AppService {
	breadcrumbs: MenuItem[];
	home: MenuItem;

	constructor() {
		this.home = { icon: 'pi pi-home', routerLink: '/' };

		this.breadcrumbs = [];
	}
}
