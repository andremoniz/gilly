import { Component, OnInit } from '@angular/core';

import { RBACService } from '../rbac.service';

@Component({
	selector: 'roles-header',
	template: `
		<div class="d-flex justify-content-between w-100 border-bottom pb-1">
			<h3>Roles</h3>
			<button nz-button class="bg-primary text-white" (click)="rbacService.editRole()">
				<i nz-icon nzType="file-add" nzTheme="outline"></i>
			</button>
		</div>
	`,
	styles: [``]
})
export class RolesHeaderComponent implements OnInit {
	constructor(public rbacService: RBACService) {}

	ngOnInit(): void {}
}
