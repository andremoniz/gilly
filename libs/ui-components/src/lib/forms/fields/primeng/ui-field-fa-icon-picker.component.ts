import { Component, OnInit } from '@angular/core';

import { UIFieldBase } from './../ui-field.base';

@Component({
	selector: 'ui-field-fa-icon-picker',
	template: `
		<input
			pInputText
			[formControl]="config.control"
			[iconPicker]="config.control.value"
			[ipPosition]="'bottom'"
			[ipWidth]="'250px'"
			[ipIconSize]="'16px'"
			[ipIconVerticalPadding]="'6px'"
			[ipIconHorizontalPadding]="'10px'"
			[ipKeepSearchFilter]="'false'"
			[ipPlaceHolder]="'Choose an icon'"
			[ipFallbackIcon]="fallbackIcon"
			(iconPickerSelect)="onIconPickerSelect($event)"
		/>
	`,
	styles: [``]
})
export class UIFieldFAIconPickerPrimeNGComponent extends UIFieldBase implements OnInit {
	fallbackIcon = '';

	constructor() {
		super();
	}

	ngOnInit(): void {}

	onIconPickerSelect(icon: string): void {
		this.config.control.setValue(icon);
	}
}
