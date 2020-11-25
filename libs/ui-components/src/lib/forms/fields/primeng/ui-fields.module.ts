import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconPickerModule } from 'ngx-icon-picker';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { ColorPickerModule } from 'primeng/colorpicker';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ListboxModule } from 'primeng/listbox';
import { MessageModule } from 'primeng/message';
import { MultiSelectModule } from 'primeng/multiselect';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PickListModule } from 'primeng/picklist';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { SliderModule } from 'primeng/slider';
import { TableModule } from 'primeng/table';

import { UtilityPipesModule } from '../../../../../../utilities/src/lib/pipes/utility-pipes.module';
import { UIMapModule } from './../../../visualization/map/ui-map.module';
import { UIFieldAutocompletePrimeNGComponent } from './ui-field-autocomplete.component';
import { UIFieldCheckboxPrimeNGComponent } from './ui-field-checkbox.component';
import { UIFieldColorPickerPrimeNGComponent } from './ui-field-colorpicker.component';
import { UIFieldDatepickerPrimeNGComponent } from './ui-field-datepicker.component';
import { UIFieldFAIconPickerPrimeNGComponent } from './ui-field-fa-icon-picker.component';
import { UIFieldIconInputPrimeNGComponent } from './ui-field-icon-path.component';
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
import { UIFieldWrapperComponent } from './ui-field-wrapper.component';
import { UIFieldsDynamicDirective } from './ui-fields-dynamic.directive';

declare var require: any;

@NgModule({
	declarations: [
		UIFieldsDynamicDirective,
		UIFieldWrapperComponent,

		UIFieldAutocompletePrimeNGComponent,
		UIFieldCheckboxPrimeNGComponent,
		UIFieldColorPickerPrimeNGComponent,
		UIFieldDatepickerPrimeNGComponent,
		UIFieldIconInputPrimeNGComponent,
		UIFieldListboxPrimeNGComponent,
		UIFieldMultiSelectPrimeNGComponent,
		UIFieldRadioButtonPrimeNGComponent,
		UIFieldRatingPrimeNGComponent,
		UIFieldPicklistPrimeNGComponent,
		UIFieldSelectPrimeNGComponent,
		UIFieldSliderPrimeNGComponent,
		UIFieldNumberPrimeNGComponent,
		UIFieldTextPrimeNGComponent,
		UIFieldTextareaPrimeNGComponent,
		UIFieldLocationPrimeNGComponent,
		UIFieldTablePrimeNGComponent,
		UIFieldFAIconPickerPrimeNGComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,

		MessageModule,
		InputTextModule,
		InputTextareaModule,
		InputNumberModule,
		AutoCompleteModule,
		DropdownModule,
		CheckboxModule,
		ColorPickerModule,
		CalendarModule,
		ListboxModule,
		MultiSelectModule,
		RadioButtonModule,
		RatingModule,
		SliderModule,
		TableModule,
		OverlayPanelModule,
		PickListModule,

		IconPickerModule,

		UIMapModule,

		UtilityPipesModule
	],
	exports: [UIFieldWrapperComponent],
	providers: []
})
export class UIFieldsPrimeNGModule {
	constructor() {
		/**
		 * TODO: THIS IS A HACK TO FIX PRIMENG MENU COMPARISONS
		 **/
		const primengUtils = require('primeng/__ivy_ngcc__/fesm2015/primeng-utils.js');

		const resolveFieldDataOVERRIDE = function (data, field) {
			if (typeof data !== 'object') return data;
			if (data && field) {
				if (this.isFunction(field)) {
					return field(data);
				} else if (field.indexOf('.') == -1) {
					return data[field];
				} else {
					let fields = field.split('.');
					let value = data;
					for (let i = 0, len = fields.length; i < len; ++i) {
						if (value == null) {
							return null;
						}
						value = value[fields[i]];
					}
					return value;
				}
			} else {
				return null;
			}
		};
		primengUtils.ObjectUtils.resolveFieldData = resolveFieldDataOVERRIDE;
	}
}
