import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { appLibRoutes } from '@lib/app-shell';

const routes: Routes = [
	// {
	// 	path: 'landing',
	// 	loadChildren: () =>
	// 		import('./features/landing/landing.module').then((m) => m.LandingModule),
	// 	data: { animation: 'Landing' },
	// 	canActivate: []
	// },
	// {
	// 	path: '',
	// 	redirectTo: '',
	// 	pathMatch: 'full',
	// 	canActivate: []
	// }
];

@NgModule({
	imports: [RouterModule.forRoot([...routes, ...appLibRoutes], { useHash: true })],
	exports: [RouterModule]
})
export class AppRoutingModule {}
