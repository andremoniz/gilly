import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

import { UIFieldsPrimeNGModule } from './fields/primeng/ui-fields.module';
import { UIFormConfigService } from './ui-form-config.service';
import { UIFormControlsComponent } from './ui-form-controls.component';
import { UIFormComponent } from './ui-form.component';

@NgModule({
	declarations: [UIFormComponent, UIFormControlsComponent],
	imports: [CommonModule, FormsModule, ReactiveFormsModule, ButtonModule, UIFieldsPrimeNGModule],
	exports: [UIFormComponent],
	providers: [UIFormConfigService]
})
export class UIFormModule {}
