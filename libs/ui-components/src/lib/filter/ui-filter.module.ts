import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule, NzIconModule, NzInputModule, NzCheckboxModule } from 'ng-zorro-antd';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzModalModule } from 'ng-zorro-antd/modal';

import { UIFilterMenuComponent } from './ui-filter-menu.component';
import { UIFilterComponent } from './ui-filter.component';

@NgModule({
	declarations: [UIFilterComponent, UIFilterMenuComponent],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		NzInputModule,
		NzDatePickerModule,
		NzCheckboxModule,
		NzSwitchModule,
		NzIconModule,
		NzButtonModule,
		NzModalModule
	],
	exports: [UIFilterComponent]
})
export class UIFilterModule {}
