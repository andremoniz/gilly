import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { SliderModule } from 'primeng/slider';

import { UIFieldAutocompletePrimeNGComponent } from './ui-field-autocomplete.component';
import { UIFieldCheckboxPrimeNGComponent } from './ui-field-checkbox.component';
import { UIFieldColorPickerPrimeNGComponent } from './ui-field-colorpicker.component';
import { UIFieldDatepickerPrimeNGComponent } from './ui-field-datepicker.component';
import { UIFieldListboxPrimeNGComponent } from './ui-field-listbox.component';
import { UIFieldMultiSelectPrimeNGComponent } from './ui-field-multiselect.component';
import { UIFieldNumberPrimeNGComponent } from './ui-field-number.component';
import { UIFieldRadioButtonPrimeNGComponent } from './ui-field-radiobutton.component';
import { UIFieldRatingPrimeNGComponent } from './ui-field-rating.component';
import { UIFieldSelectPrimeNGComponent } from './ui-field-select.component';
import { UIFieldSliderPrimeNGComponent } from './ui-field-slider.component';
import { UIFieldTextPrimeNGComponent } from './ui-field-text.component';
import { UIFieldTextareaPrimeNGComponent } from './ui-field-textarea.component';
import { UIFieldWrapperComponent } from './ui-field-wrapper.component';
import { UIFieldsDynamicDirective } from './ui-fields-dymamic.directive';

@NgModule({
	declarations: [
		UIFieldsDynamicDirective,
		UIFieldWrapperComponent,

		UIFieldAutocompletePrimeNGComponent,
		UIFieldCheckboxPrimeNGComponent,
		UIFieldColorPickerPrimeNGComponent,
		UIFieldDatepickerPrimeNGComponent,
		UIFieldListboxPrimeNGComponent,
		UIFieldMultiSelectPrimeNGComponent,
		UIFieldRadioButtonPrimeNGComponent,
		UIFieldRatingPrimeNGComponent,
		UIFieldSelectPrimeNGComponent,
		UIFieldSliderPrimeNGComponent,
		UIFieldNumberPrimeNGComponent,
		UIFieldTextPrimeNGComponent,
		UIFieldTextareaPrimeNGComponent
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
		SliderModule
	],
	exports: [UIFieldWrapperComponent],
	providers: []
})
export class UIFieldsPrimeNGModule {}
