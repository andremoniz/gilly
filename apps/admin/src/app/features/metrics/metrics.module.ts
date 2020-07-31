import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzAvatarModule, NzTabsModule, NzButtonModule } from 'ng-zorro-antd';

import { UINumberChartModule } from './../../../../../../libs/ui-components/src/lib/visualization/chart/number/ui-number-chart.module';
import { UITableModule } from './../../../../../../libs/ui-components/src/lib/visualization/table/ui-table.module';
import { MetricsComponent } from './metrics.component';

@NgModule({
	declarations: [MetricsComponent],
	imports: [
		CommonModule,

		NzAvatarModule,
		NzTabsModule,
		NzButtonModule,

		UITableModule,
		UINumberChartModule,

		RouterModule.forChild([
			{
				path: '',
				component: MetricsComponent
			}
		])
	],
	exports: [],
	providers: []
})
export class MetricsModule {}
