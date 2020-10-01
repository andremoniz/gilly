import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UIFieldsPrimeNGModule } from './fields/primeng/ui-fields.module';
import { UIFormComponent } from './ui-form.component';

@NgModule({
	declarations: [UIFormComponent],
	imports: [CommonModule, FormsModule, ReactiveFormsModule, UIFieldsPrimeNGModule],
	exports: [UIFormComponent],
	providers: []
})
export class UIFormModule {}
