import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UIVisualizationModule } from '../ui-visualization.module';
import { UITableComponent } from './ui-table.component';

@NgModule({
	declarations: [UITableComponent],
	imports: [CommonModule, UIVisualizationModule],
	exports: [UITableComponent],
	providers: []
})
export class UITableModule {}
