import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { UIFormInterface } from './ui-form.component';

@Component({
	selector: 'ui-form-controls',
	template: `
        <div
            [ngClass]="config.ignoreContainer ? '' : 'container'"
			class="container-header d-flex justify-content-between mb-1"
			*ngIf="!config.hideControls"
		>
			<div #formTitle>
				<h3 *ngIf="config.title">{{ config.title }}</h3>
			</div>

			<div #formButtons>
				<button
					pButton
					pRipple
					label="Delete"
					icon="pi pi-trash"
					class="p-button-danger mr-3"
					*ngIf="config.value?.id && !config.hideDelete"
					(click)="delete.emit()"
				></button>

				<button
					pButton
					pRipple
					[label]="config.saveButtonText || 'Save'"
					icon="pi pi-save"
					(click)="save.emit()"
					*ngIf="!config.hideSave"
				></button>
			</div>
		</div>
	`,
	styles: [``]
})
export class UIFormControlsComponent implements OnInit {
	@Input() config: UIFormInterface;

	@Output() save = new EventEmitter();
	@Output() delete = new EventEmitter();

	constructor() {}

	ngOnInit() {}
}
