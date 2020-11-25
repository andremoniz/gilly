import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { deepClone } from '../../../../utilities/src/lib/utilities/deepClone';
import { EntityFieldConfig } from './../../../../entities/entity-field-config';
import { handleFieldVisibility } from './fields/configurators/ui-field-visibility';
import { UIFormConfigService } from './ui-form-config.service';

export interface UIFormInterface {
	fieldConfig: EntityFieldConfig[];
	formGroup?: FormGroup;
	value?: any;
	immutable?: boolean;
	hideControls?: boolean;
	hideSave?: boolean;
	hideDelete?: boolean;
	ignoreContainer?: boolean;
	title?: string;
	saveButtonText?: string;
}

@Component({
	selector: 'ui-form',
	template: `
		<ui-form-controls
			[config]="config"
			(save)="handleSave(value)"
			(delete)="delete.emit(value)"
		></ui-form-controls>

		<form
			[ngClass]="config.ignoreContainer ? '' : 'container'"
			class="d-flex flex-wrap"
			[formGroup]="formGroup"
			(keydown)="keyDownFunction($event)"
			*ngIf="formGroup"
		>
			<ui-field-wrapper
				*ngFor="let field of config.fieldConfig"
				[ngClass]="field.className || 'col-12'"
				[config]="{
					field: field,
					control: formGroup.get(field.key || field.label),
					group: formGroup
				}"
			></ui-field-wrapper>
		</form>
	`,
	styles: [``],
	providers: []
})
export class UIFormComponent implements OnInit {
	formGroup: FormGroup;

	private firstLoad = true;

	private _value: any;
	get value(): any {
		return this._value;
	}

	private _config: UIFormInterface;
	@Input()
	set config(c: UIFormInterface) {
		this.setupConfig(c);
	}
	get config(): UIFormInterface {
		return this._config;
	}

	@Output() formChanged = new EventEmitter();
	@Output() save = new EventEmitter();
	@Output() delete = new EventEmitter();

	@Output() configChanged = new EventEmitter();

	constructor(private formConfigService: UIFormConfigService) {}

	ngOnInit(): void {}

	private setupConfig(c: UIFormInterface) {
		this._config = { ...c };

		if (c.immutable) {
			this._value = deepClone(c.value);
		} else {
			this._value = c.value || {};
		}

		if (c.formGroup) {
			this.formGroup = c.formGroup;
			this.formGroup.valueChanges.subscribe((value) => {
				this.formChanged.emit(value);
			});
		} else {
			this.formGroup = this.formConfigService.createFormFromConfig(c.fieldConfig, c.value);
			this.formGroup.valueChanges.subscribe((value) => {
				Object.assign(this._value, value);
				if (!this._value.id) delete this._value.id;
				this.formChanged.emit(this._value);
			});
		}

		c.fieldConfig.forEach((field) => {
			if (field.hidden) {
				field.visible = false;
			} else {
				field.visible = handleFieldVisibility(field, this.formGroup);
			}
		});

		if (this.firstLoad) {
			this.configChanged.emit(true);
			this.firstLoad = false;
		}
	}

	handleSave(value: any) {
		if (this.formGroup.valid) {
			this.save.emit(value);
		} else {
			this.formGroup.markAllAsTouched();
		}
	}

	keyDownFunction(event) {
		if (event.keyCode === 13) {
			this.handleSave(this.value);
		}
	}
}
