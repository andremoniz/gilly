import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { UIVisualizationModule } from '../../ui-visualization.module';
import { UIBarChartComponent } from './ui-bar-chart.component';

@NgModule({
	declarations: [UIBarChartComponent],
	imports: [CommonModule, NgxChartsModule, UIVisualizationModule],
	exports: [UIBarChartComponent],
	providers: []
})
export class UIBarChartModule {}
