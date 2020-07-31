import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { UIVisualizationModule } from '../../ui-visualization.module';
import { UIGaugeChartComponent } from './ui-gauge-chart.component';

@NgModule({
	declarations: [UIGaugeChartComponent],
	imports: [CommonModule, NgxChartsModule, UIVisualizationModule],
	exports: [UIGaugeChartComponent],
	providers: []
})
export class UIGaugeChartModule {}
