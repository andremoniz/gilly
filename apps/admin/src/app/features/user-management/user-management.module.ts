import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormTakingModule } from '@lib/form-creator';
import { NzIconModule, NzInputModule, NzListModule } from 'ng-zorro-antd';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTreeModule } from 'ng-zorro-antd/tree';

import { UITableModule } from '../../../../../../libs/ui-components/src/lib/visualization/table/ui-table.module';
import { RBACService } from './rbac/rbac.service';
import { RolesManagementComponent } from './rbac/roles-management.component';
import { RolesHeaderComponent } from './rbac/roles/roles-header.component';
import { RolesListComponent } from './rbac/roles/roles-list.component';
import { RBACTreeManagementComponent } from './rbac/tree-management/rbac-tree-management.component';
import { UserManagementComponent } from './user-management.component';
import { UserManagementService } from './user-management.service';

@NgModule({
	declarations: [
		UserManagementComponent,
		RolesManagementComponent,
		RolesListComponent,
		RolesHeaderComponent,
		RBACTreeManagementComponent
	],
	imports: [
		CommonModule,
		FormsModule,

		NzTabsModule,
		NzListModule,
		NzTreeModule,
		NzInputModule,
		NzIconModule,

		FormTakingModule,
		UITableModule,

		RouterModule.forChild([
			{
				path: '',
				component: UserManagementComponent
			}
		])
	],
	exports: [],
	providers: [UserManagementService, RBACService]
})
export class UserManagementModule {}
