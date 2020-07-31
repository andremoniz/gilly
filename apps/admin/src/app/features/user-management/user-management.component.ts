import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzTabComponent } from 'ng-zorro-antd';

import {
	EditModalConfig,
	FormTakingService
} from './../../../../../../libs/form-creator/src/lib/services/form-taking.service';
import { UITableDisplayOptions } from './../../../../../../libs/ui-components/src/lib/visualization/table/ui-table.interface';
import { UserManagementService } from './user-management.service';
import { RBACService } from './rbac/rbac.service';
import { take } from 'rxjs/operators';

@Component({
	selector: 'user-management',
	template: `
		<div class="container container-wrapper">
			<div class="container-main">
				<nz-tabset
					(nzSelectChange)="handleTabChange($event)"
					[nzSelectedIndex]="selectedTabIndex"
				>
					<nz-tab nzTitle="Users">
						<ui-table
							[data]="userService.users$"
							[displayOptions]="userTableOptions"
							(cellClicked)="
								formTakingService.showEditModal($event.data, userEditConfig)
							"
							(rowAdd)="formTakingService.showEditModal(null, userEditConfig)"
							(rowDelete)="userService.deleteUser($event)"
						></ui-table>
					</nz-tab>

					<nz-tab nzTitle="Roles">
						<roles-management></roles-management>
					</nz-tab>
				</nz-tabset>
			</div>
		</div>
	`,
	styles: [``]
})
export class UserManagementComponent implements OnInit {
	userTableOptions: UITableDisplayOptions = {
		defaultPageSize: 25,
		showAdd: true,
		showDelete: true,
		columns: [
			{ prop: 'roles.role', name: 'Roles' },
			{ prop: 'username' },
			{ prop: 'email' },
			{ prop: 'createDate', type: 'date', dateStyle: 'short' },
			{ prop: 'lastLoggedInDate', name: 'Last Login', type: 'date', dateStyle: 'short' },
			{ prop: 'numSuccessfulLogin', name: '# Success' },
			{ prop: 'numFailedLogin', name: '# Failed' }
		]
	};

	selectedTabIndex = 0;

	userEditConfig: EditModalConfig = {
		save: this.userService.saveUser.bind(this.userService),
		delete: this.userService.deleteUser,
		nameProp: 'username',
		fields: [
			{
				key: 'username',
				type: 'input',
				label: 'Username',
				required: true
			},

			{
				key: 'password',
				type: 'input',
				label: 'New Password'
			},

			{
				key: 'email',
				type: 'input',
				label: 'E-Mail'
			},

			{
				key: 'numFailedLogin',
				type: 'input',
				label: '# Failed Logins',
				templateOptions: {
					type: 'number'
				},
				className: 'col-9'
			},
			{
				key: 'isLocked',
				type: 'checkbox',
				label: 'Is Locked',
				className: 'col-3'
			},

			{
				key: 'roles',
				type: 'selectsearch',
				multiple: true,
				label: 'Role Group',
				options: this.rbacService.roles$,
				templateOptions: {
					labelProp: 'role',
					ignoreId: true
				},
				required: true
			}
		]
	};

	constructor(
		public userService: UserManagementService,
		public formTakingService: FormTakingService,
		public rbacService: RBACService,
		private router: Router,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.route.fragment.subscribe((frag) => {
			this.selectedTabIndex = +frag;
		});

		this.rbacService.getRoles().pipe(take(1)).subscribe();
	}

	handleTabChange(event: { index: number; tab: NzTabComponent }) {
		this.selectedTabIndex = event.index;
		this.router.navigate([], { relativeTo: this.route, fragment: `${event.index}` });
	}
}
