import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { UIVisualizationModule } from '../../ui-visualization.module';
import { UIHeatChartComponent } from './ui-heat-chart.component';

@NgModule({
	declarations: [UIHeatChartComponent],
	imports: [CommonModule, NgxChartsModule, UIVisualizationModule],
	exports: [UIHeatChartComponent],
	providers: []
})
export class UIHeatChartModule {}
