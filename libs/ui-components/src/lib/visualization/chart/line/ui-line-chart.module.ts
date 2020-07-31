import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { UILineChartComponent } from './ui-line-chart.component';
import { UIVisualizationModule } from '../../ui-visualization.module';

@NgModule({
	declarations: [UILineChartComponent],
	imports: [CommonModule, NgxChartsModule, UIVisualizationModule],
	exports: [UILineChartComponent],
	providers: []
})
export class UILineChartModule {}
