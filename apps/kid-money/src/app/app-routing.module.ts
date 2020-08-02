import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { appLibRoutes } from '@lib/app-shell';

const routes: Routes = [
	{
		path: 'kid',
		loadChildren: () => import('./features/kid/kid.module').then((m) => m.KidModule),
		data: { animation: 'Kid', breadcrumb: 'Kid' },
		canActivate: []
	},
	{
		path: 'home',
		loadChildren: () => import('./features/home/home.module').then((m) => m.HomeModule),
		data: { animation: 'Home', breadcrumb: 'Home' },
		canActivate: []
	},
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full',
		canActivate: []
	}
];

@NgModule({
	imports: [RouterModule.forRoot([...routes, ...appLibRoutes], { useHash: true })],
	exports: [RouterModule]
})
export class AppRoutingModule {}
