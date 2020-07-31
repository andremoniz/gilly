import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd';
import { NzTableModule } from 'ng-zorro-antd/table';

import { UIVisualizationModule } from '../ui-visualization.module';
import { UITableComponent } from './ui-table.component';

@NgModule({
	declarations: [UITableComponent],
	imports: [CommonModule, UIVisualizationModule, NzTableModule, NzIconModule],
	exports: [UITableComponent],
	providers: []
})
export class UITableModule {}
