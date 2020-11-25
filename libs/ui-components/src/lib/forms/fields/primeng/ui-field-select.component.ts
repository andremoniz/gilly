import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { UIFieldBase } from './../ui-field.base';

@Component({
	selector: 'ui-field-select',
	template: `
		<ng-container *ngIf="field.groupOptions">
			<p-dropdown
				appendTo="body"
				[formControl]="control"
				[options]="field.options | async"
				[showClear]="true"
				[group]="true"
				[dataKey]="control?.value?.id ? 'id' : field.valueProp"
			>
				<ng-template let-group pTemplate="group"> {{ group.label }} </ng-template>
			</p-dropdown>
		</ng-container>

		<ng-container *ngIf="!field.groupOptions">
			<ng-container *ngIf="field.labelProp">
				<p-dropdown
					appendTo="body"
					[formControl]="control"
					[options]="field.options | async"
					[editable]="field.editable"
					[showClear]="true"
					[optionLabel]="field.labelProp || 'label'"
					[dataKey]="control?.value?.id ? 'id' : field.valueProp"
				></p-dropdown>
			</ng-container>

			<ng-container *ngIf="!field.labelProp">
				<p-dropdown
					appendTo="body"
					[formControl]="control"
					[options]="field.options | async"
					[editable]="field.editable"
					[showClear]="true"
					[dataKey]="control?.value?.id ? 'id' : field.valueProp"
				></p-dropdown>
			</ng-container>
		</ng-container>
	`,
	styles: [``],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UIFieldSelectPrimeNGComponent extends UIFieldBase implements OnInit {
	constructor() {
		super();
	}

	ngOnInit(): void {}
}
