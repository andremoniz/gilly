import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzTabComponent } from 'ng-zorro-antd/tabs';

import { RBACService } from './rbac.service';

@Component({
	selector: 'roles-management',
	template: `
		<div class="container-wrapper">
			<div class="container-main d-flex h-100">
				<div class="col-2 border-right">
					<roles-header></roles-header>
					<roles-list></roles-list>
				</div>
				<div class="col-10">
					<nz-tabset
						(nzSelectChange)="handleTabChange($event)"
						[nzSelectedIndex]="selectedTreeIndex"
					>
						<nz-tab nzTitle="Actions">
							<rbac-tree-management
								[title]="'Actions'"
								[nodes]="rbacService.actionNodes"
								(nodeChecked)="rbacService.handleActionChecked($event)"
							></rbac-tree-management>
						</nz-tab>

						<nz-tab nzTitle="Entities">
							<rbac-tree-management
								[title]="'Entities'"
								[nodes]="rbacService.entityNodes"
								(nodeChecked)="rbacService.handleEntityChecked($event)"
							></rbac-tree-management>
						</nz-tab>
					</nz-tabset>
				</div>
			</div>
		</div>
	`,
	styles: []
})
export class RolesManagementComponent implements OnInit {
	selectedTreeIndex = 0;

	constructor(
		public rbacService: RBACService,
		private router: Router,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.route.fragment.subscribe((frag) => {
			if (!frag) return;
			const splitFrag = frag.split('-');
			if (splitFrag[1]) {
				this.selectedTreeIndex = +splitFrag[1];
			} else {
				this.selectedTreeIndex = 0;
			}
		});
	}

	handleTabChange(event: { index: number; tab: NzTabComponent }) {
		this.selectedTreeIndex = event.index;
		// this.router.navigate([], { relativeTo: this.route, fragment: `1-${event.index}` });
	}
}
