import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { EntityFieldConfig } from '../../../../entities/base';
import { getUniqueProps } from '../../../../utilities/src/lib/utilities/getUniqueProps';

@Injectable()
export class UIFormConfigService {
	constructor(private fb: FormBuilder) {}

	createFormFromConfig(fieldConfig: EntityFieldConfig[], entity?: any) {
		const controls = {
			id: entity ? entity.id : null
		};
		fieldConfig.forEach((field) => {
			controls[field.key || field.label] = this.getEntityControl(field, entity);
		});
		return this.fb.group(controls);
	}

	private getEntityControl(field: EntityFieldConfig, entity?: any) {
		let control: any;

		if (field.type === 'date') {
			control = entity && entity[field.key] ? new Date(entity[field.key]) : '';
		} else if (field.type === 'array') {
			control = this.createFormArrayItemControls(entity ? entity[field.key] : []);
		} else {
			control = entity ? entity[field.key] : '';
		}

		return control;
	}

	private createFormArrayItemControls(entities?: any[]) {
		const props = getUniqueProps(entities).map((p) => {
			return { key: p };
		});
		const controls = [];
		(entities || []).forEach((e) => {
			controls.push(this.createFormFromConfig(props, e));
		});
		return this.fb.array(controls);
	}
}
