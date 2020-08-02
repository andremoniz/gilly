import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PageContainerModule } from '@lib/app-shell';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';

import { KidComponent } from './kid.component';

@NgModule({
	declarations: [KidComponent],
	imports: [
		CommonModule,

		ToolbarModule,
		ButtonModule,

		PageContainerModule,

		RouterModule.forChild([
			{ path: '', component: KidComponent },
			{ path: ':id', component: KidComponent }
		])
	],
	exports: [],
	providers: []
})
export class KidModule {}
