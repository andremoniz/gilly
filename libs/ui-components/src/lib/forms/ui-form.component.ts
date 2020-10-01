import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { EntityFieldConfig } from './../../../../entities/base';
import { UIFormConfigService } from './ui-form-config.service';

interface UIFormInterface {
	fieldConfig: EntityFieldConfig[];
	entity?: any;
}

@Component({
	selector: 'ui-form',
	template: `
		<form
			class="d-flex flex-wrap"
			[formGroup]="formGroup"
			(keydown)="keyDownFunction($event)"
			*ngIf="formGroup"
		>
			<ui-field-wrapper
				*ngFor="let field of config.fieldConfig"
				[ngClass]="field.className || 'col-12'"
				[config]="{ field: field, control: formGroup.get(field.key || field.label) }"
			></ui-field-wrapper>
		</form>
	`,
	styles: [``],
	providers: [UIFormConfigService]
})
export class UIFormComponent implements OnInit {
	private _config: UIFormInterface;
	@Input()
	set config(c: UIFormInterface) {
		this._config = c;

		this.formGroup = this.formConfigService.createFormFromConfig(c.fieldConfig, c.entity);

		this.formGroup.valueChanges.subscribe((value) => {
			this.formChanged.emit(value);
		});
	}
	get config(): UIFormInterface {
		return this._config;
	}

	formGroup: FormGroup;

	@Output() formChanged = new EventEmitter();
	@Output() enterKey = new EventEmitter();

	constructor(private formConfigService: UIFormConfigService) {}

	ngOnInit(): void {}

	keyDownFunction(event) {
		if (event.keyCode === 13) {
			this.enterKey.emit(true);
		}
	}
}
