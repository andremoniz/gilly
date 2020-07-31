import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { UIVisualizationModule } from '../../ui-visualization.module';
import { UIBubbleChartComponent } from './ui-bubble-chart.component';

@NgModule({
	declarations: [UIBubbleChartComponent],
	imports: [CommonModule, NgxChartsModule, UIVisualizationModule],
	exports: [UIBubbleChartComponent],
	providers: []
})
export class UIBubbleChartModule {}
