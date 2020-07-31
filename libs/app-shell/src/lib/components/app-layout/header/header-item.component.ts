import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { HeaderItemConfig } from '../app-layout.component';

@Component({
	selector: 'lib-header-item',
	templateUrl: './header-item.component.html',
	styleUrls: ['./header-item.component.scss']
})
export class HeaderItemComponent implements OnInit {
	@Input() item: HeaderItemConfig;

	constructor(private router: Router, private route: ActivatedRoute) {}

	ngOnInit(): void {}

	handleLinkClick(item: HeaderItemConfig) {
		if (item.linkLocation.indexOf('http') >= 0) {
			window.open(item.linkLocation, '_blank');
		} else {
			this.router.navigate([item.linkLocation], { relativeTo: this.route });
		}
	}
}
