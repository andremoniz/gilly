import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { UIVisualizationModule } from '../../ui-visualization.module';
import { UIPieChartComponent } from './ui-pie-chart.component';

@NgModule({
	declarations: [UIPieChartComponent],
	imports: [CommonModule, NgxChartsModule, UIVisualizationModule],
	exports: [UIPieChartComponent],
	providers: []
})
export class UIPieChartModule {}
