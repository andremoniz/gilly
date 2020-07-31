import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { UIVisualizationModule } from '../../ui-visualization.module';
import { UITreeChartComponent } from './ui-tree-chart.component';

@NgModule({
	declarations: [UITreeChartComponent],
	imports: [CommonModule, NgxChartsModule, UIVisualizationModule],
	exports: [UITreeChartComponent],
	providers: []
})
export class UITreeChartModule {}
