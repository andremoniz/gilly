import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';

import { EditToolbarComponent } from './edit-toolbar.component';

@NgModule({
	declarations: [EditToolbarComponent],
	imports: [CommonModule, ButtonModule],
	exports: [EditToolbarComponent],
	providers: []
})
export class CoreModule {}
