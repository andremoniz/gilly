import {
	ComponentFactoryResolver,
	Directive,
	EventEmitter,
	Input,
	OnInit,
	Output,
	ViewContainerRef
} from '@angular/core';

import { EntityFieldConfig } from './../../../../../../entities/entity-field-config';
import { UIFieldConfig } from './../ui-field.base';
import { UIFieldAutocompletePrimeNGComponent } from './ui-field-autocomplete.component';
import { UIFieldCheckboxPrimeNGComponent } from './ui-field-checkbox.component';
import { UIFieldColorPickerPrimeNGComponent } from './ui-field-colorpicker.component';
import { UIFieldDatepickerPrimeNGComponent } from './ui-field-datepicker.component';
import { UIFieldFAIconPickerPrimeNGComponent } from './ui-field-fa-icon-picker.component';
import { UIFieldIconInputPrimeNGComponent } from './ui-field-icon-path.component';
import { UIFieldLabelPrimeNGComponent } from './ui-field-label.component';
import { UIFieldListboxPrimeNGComponent } from './ui-field-listbox.component';
import { UIFieldLocationPrimeNGComponent } from './ui-field-location.component';
import { UIFieldMultiSelectPrimeNGComponent } from './ui-field-multiselect.component';
import { UIFieldNumberPrimeNGComponent } from './ui-field-number.component';
import { UIFieldPicklistPrimeNGComponent } from './ui-field-picklist.component';
import { UIFieldRadioButtonPrimeNGComponent } from './ui-field-radiobutton.component';
import { UIFieldRatingPrimeNGComponent } from './ui-field-rating.component';
import { UIFieldSelectPrimeNGComponent } from './ui-field-select.component';
import { UIFieldSliderPrimeNGComponent } from './ui-field-slider.component';
import { UIFieldTablePrimeNGComponent } from './ui-field-table.component';
import { UIFieldTextPrimeNGComponent } from './ui-field-text.component';
import { UIFieldTextareaPrimeNGComponent } from './ui-field-textarea.component';

const componentMapper = {
	autocomplete: UIFieldAutocompletePrimeNGComponent,
	checkbox: UIFieldCheckboxPrimeNGComponent,
	colorpicker: UIFieldColorPickerPrimeNGComponent,
	date: UIFieldDatepickerPrimeNGComponent,
	datepicker: UIFieldDatepickerPrimeNGComponent,
	label: UIFieldLabelPrimeNGComponent,
	location: UIFieldLocationPrimeNGComponent,
	listbox: UIFieldListboxPrimeNGComponent,
	number: UIFieldNumberPrimeNGComponent,
	iconinput: UIFieldIconInputPrimeNGComponent,
	faiconpicker: UIFieldFAIconPickerPrimeNGComponent,
	multiselect: UIFieldMultiSelectPrimeNGComponent,
	selectmultiple: UIFieldMultiSelectPrimeNGComponent,
	radio: UIFieldRadioButtonPrimeNGComponent,
	radiobutton: UIFieldRadioButtonPrimeNGComponent,
	rating: UIFieldRatingPrimeNGComponent,
	select: UIFieldSelectPrimeNGComponent,
	slider: UIFieldSliderPrimeNGComponent,
	text: UIFieldTextPrimeNGComponent,
	textarea: UIFieldTextareaPrimeNGComponent,
	input: UIFieldTextPrimeNGComponent,
	table: UIFieldTablePrimeNGComponent,
	picklist: UIFieldPicklistPrimeNGComponent,
	undefined: UIFieldTextPrimeNGComponent,
	null: UIFieldTextPrimeNGComponent
};

@Directive({
	selector: '[dynamicField]'
})
export class UIFieldsDynamicDirective implements OnInit {
	@Input() config: UIFieldConfig;

	componentRef: any;

	@Output() fieldChanged = new EventEmitter<{ field: EntityFieldConfig; value: any }>();

	constructor(private resolver: ComponentFactoryResolver, private container: ViewContainerRef) {}

	ngOnInit() {
		this.generateFieldComponent();
	}

	private generateFieldComponent() {
		const factory = this.resolver.resolveComponentFactory(
			componentMapper[this.config.field.type]
		);
		this.componentRef = this.container.createComponent(factory);
		this.componentRef.instance.config = this.config;

		this.config.control.valueChanges.subscribe((value) => {
			this.fieldChanged.emit({
				field: this.config.field,
				value
			});
		});
	}
}
