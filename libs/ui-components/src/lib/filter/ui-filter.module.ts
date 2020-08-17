import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UIFilterMenuComponent } from './ui-filter-menu.component';
import { UIFilterComponent } from './ui-filter.component';

@NgModule({
	declarations: [UIFilterComponent, UIFilterMenuComponent],
	imports: [CommonModule, FormsModule, ReactiveFormsModule],
	exports: [UIFilterComponent]
})
export class UIFilterModule {}
