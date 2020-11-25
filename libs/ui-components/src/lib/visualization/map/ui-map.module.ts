import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DialogModule } from 'primeng/dialog';

import { UIVisualizationModule } from '../ui-visualization.module';
import { UIMapComponent } from './ui-map.component';

@NgModule({
	declarations: [UIMapComponent],
	imports: [CommonModule, UIVisualizationModule, DialogModule],
	exports: [UIMapComponent],
	providers: []
})
export class UIMapModule {}
