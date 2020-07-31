import { MatRippleModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzCardModule } from 'ng-zorro-antd';

import { AdminOverviewComponent } from './overview.component';

@NgModule({
	declarations: [AdminOverviewComponent],
	imports: [
		CommonModule,

		NzCardModule,
		
		MatRippleModule,

		RouterModule.forChild([
			{
				path: '',
				component: AdminOverviewComponent
			}
		])
	],
	exports: [],
	providers: []
})
export class OverviewModule {}
