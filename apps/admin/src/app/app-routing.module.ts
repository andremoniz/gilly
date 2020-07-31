import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { appLibRoutes, AuthGuard, RoleGuard } from '@lib/app-shell';

const routes: Routes = [
	{
		path: 'data-tools',
		loadChildren: () =>
			import('./features/data-tools/data-tools.module').then((m) => m.DataToolsModule),
		data: { animation: '', expectedRoles: ['superadmin'], breadcrumb: 'Data Tools' },
		canActivate: [RoleGuard, AuthGuard]
	},
	{
		path: 'form-editor',
		loadChildren: () =>
			import('./features/form-creator/admin-form-creator.module').then(
				(m) => m.AdminFormCreatorModule
			),
		data: { animation: '', expectedRoles: ['superadmin'], breadcrumb: 'Form Editor' },
		canActivate: [RoleGuard, AuthGuard]
	},
	{
		path: 'metrics',
		loadChildren: () =>
			import('./features/metrics/metrics.module').then((m) => m.MetricsModule),
		data: { animation: '', expectedRoles: ['superadmin'], breadcrumb: 'Metrics' },
		canActivate: [RoleGuard, AuthGuard]
	},
	{
		path: 'user-management',
		loadChildren: () =>
			import('./features/user-management/user-management.module').then(
				(m) => m.UserManagementModule
			),
		data: { animation: '', expectedRoles: ['superadmin'], breadcrumb: 'User Management' },
		canActivate: [RoleGuard, AuthGuard]
	},
	{
		path: '',
		loadChildren: () =>
			import('./features/overview/overview.module').then((m) => m.OverviewModule),
		data: { animation: 'Admin', expectedRoles: ['superadmin'] },
		canActivate: [RoleGuard, AuthGuard]
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot([...routes, ...appLibRoutes], {
			paramsInheritanceStrategy: 'always',
			useHash: true
		})
	],
	exports: [RouterModule]
})
export class AppRoutingModule {}
