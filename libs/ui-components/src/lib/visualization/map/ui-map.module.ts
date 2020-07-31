import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { UIVisualizationModule } from '../ui-visualization.module';
import { UIMapComponent } from './ui-map.component';

@NgModule({
	declarations: [UIMapComponent],
	imports: [CommonModule, LeafletModule, UIVisualizationModule],
	exports: [UIMapComponent],
	providers: []
})
export class UIMapModule {}
