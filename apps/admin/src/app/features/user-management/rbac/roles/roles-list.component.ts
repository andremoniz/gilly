import { Component, OnInit } from '@angular/core';

import { RBACService } from '../rbac.service';

@Component({
	selector: 'roles-list',
	template: `
		<nz-list nzSize="small">
			<nz-list-item
				*ngFor="let role of rbacService.roles"
				class="clickable role-item"
				(click)="rbacService.handleRoleClick(role)"
				[ngClass]="rbacService.selectedRole === role ? 'active' : ''"
			>
				<div class="d-flex justify-content-between w-100">
					<span>{{ role.role }}</span>
					<i
						nz-icon
						nzType="edit"
						nzTheme="outline"
						(click)="rbacService.editRole(role)"
					></i>
				</div>
			</nz-list-item>
		</nz-list>
	`,
	styles: [
		`
			.role-item {
			}

			.role-item:hover {
				border-right: 3px solid white;
				transition: 200ms;
			}

			.role-item:active {
				transform: scale(1.05);
				transition: 200ms;
			}

			.active {
				border: 1px solid white;
			}
		`
	]
})
export class RolesListComponent implements OnInit {
	constructor(public rbacService: RBACService) {}

	ngOnInit(): void {}
}
