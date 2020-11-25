import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api/menuitem';

import { AuthService } from '../../../..';
import { deepClone } from '../../../../../../utilities/src/lib/utilities/deepClone';
import { HeaderItemConfig } from '../app-layout.component';

@Component({
	selector: 'lib-header-item',
	templateUrl: './header-item.component.html',
	styleUrls: ['./header-item.component.scss']
})
export class HeaderItemComponent implements OnInit {
	_item: HeaderItemConfig;
	@Input()
	set item(i: HeaderItemConfig) {
		if (this.auth.isUserAuthorized(i.roles)) {
			this._item = deepClone(i);

			if (this.item.type === 'menu' && this.item.menuItems) {
				this.item.menuItems = this.item.menuItems.filter(
					(item: Partial<MenuItem & { roles: string[] }>) => {
						return this.auth.isUserAuthorized(item.roles);
					}
				);
			}
		}
	}
	get item(): HeaderItemConfig {
		return this._item;
	}

	constructor(private router: Router, private route: ActivatedRoute, public auth: AuthService) {}

	ngOnInit(): void {}

	handleLinkClick(item: HeaderItemConfig) {
		if (item.linkLocation.indexOf('http') >= 0) {
			window.open(item.linkLocation, '_blank');
		} else {
			this.router.navigate([item.linkLocation], { relativeTo: this.route });
		}
	}
}
