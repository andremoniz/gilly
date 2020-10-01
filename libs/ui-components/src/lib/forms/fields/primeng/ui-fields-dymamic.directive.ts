import {
	ChangeDetectorRef,
	ComponentFactoryResolver,
	Directive,
	Input,
	OnDestroy,
	OnInit,
	ViewContainerRef
} from '@angular/core';
import { Subject } from 'rxjs';

import { UIFieldConfig } from './../ui-field.base';
import { UIFieldAutocompletePrimeNGComponent } from './ui-field-autocomplete.component';
import { UIFieldCheckboxPrimeNGComponent } from './ui-field-checkbox.component';
import { UIFieldColorPickerPrimeNGComponent } from './ui-field-colorpicker.component';
import { UIFieldDatepickerPrimeNGComponent } from './ui-field-datepicker.component';
import { UIFieldListboxPrimeNGComponent } from './ui-field-listbox.component';
import { UIFieldMultiSelectPrimeNGComponent } from './ui-field-multiselect.component';
import { UIFieldRadioButtonPrimeNGComponent } from './ui-field-radiobutton.component';
import { UIFieldRatingPrimeNGComponent } from './ui-field-rating.component';
import { UIFieldSelectPrimeNGComponent } from './ui-field-select.component';
import { UIFieldSliderPrimeNGComponent } from './ui-field-slider.component';
import { UIFieldTextPrimeNGComponent } from './ui-field-text.component';
import { UIFieldTextareaPrimeNGComponent } from './ui-field-textarea.component';

const componentMapper = {
	autocomplete: UIFieldAutocompletePrimeNGComponent,
	checkbox: UIFieldCheckboxPrimeNGComponent,
	colorpicker: UIFieldColorPickerPrimeNGComponent,
	date: UIFieldDatepickerPrimeNGComponent,
	datepicker: UIFieldDatepickerPrimeNGComponent,
	listbox: UIFieldListboxPrimeNGComponent,
	multiselect: UIFieldMultiSelectPrimeNGComponent,
	radio: UIFieldRadioButtonPrimeNGComponent,
	radiobutton: UIFieldRadioButtonPrimeNGComponent,
	rating: UIFieldRatingPrimeNGComponent,
	select: UIFieldSelectPrimeNGComponent,
	slider: UIFieldSliderPrimeNGComponent,
	input: UIFieldTextPrimeNGComponent,
	text: UIFieldTextPrimeNGComponent,
	textarea: UIFieldTextareaPrimeNGComponent,
	undefined: UIFieldTextPrimeNGComponent,
	null: UIFieldTextPrimeNGComponent
};

@Directive({
	selector: '[dynamicField]'
})
export class UIFieldsDynamicDirective implements OnInit, OnDestroy {
	private unsub: Subject<any> = new Subject<void>();

	@Input() config: UIFieldConfig;

	componentRef: any;

	constructor(
		private resolver: ComponentFactoryResolver,
		private container: ViewContainerRef,
		private cdRef: ChangeDetectorRef
	) {}

	ngOnInit() {
		const factory = this.resolver.resolveComponentFactory(
			componentMapper[this.config.field.type]
		);
		this.componentRef = this.container.createComponent(factory);
		this.componentRef.instance.config = this.config;
	}

	ngAfterViewInit() {
		this.cdRef.detectChanges();
	}

	ngOnDestroy() {
		this.unsub.next();
		this.unsub.complete();
	}
}
