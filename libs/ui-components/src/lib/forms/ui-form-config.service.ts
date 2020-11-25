import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';

import { EntityFieldConfig } from '../../../../entities/entity-field-config';
import { getUniqueProps } from '../../../../utilities/src/lib/utilities/getUniqueProps';
import { arrayFieldTypes, dateFieldTypes } from './fields/ui-field.base';

@Injectable()
export class UIFormConfigService {
	constructor(private fb: FormBuilder) {}

	createFormFromConfig(fieldConfig: EntityFieldConfig[], entity?: any) {
		const controls = {
			id: entity ? entity.id : null
		};

		if (fieldConfig) {
			fieldConfig.forEach((field) => {
				controls[field.key || field.label] = this.getEntityControl(field, entity);
			});
		}

		return this.fb.group(controls);
	}

	private getEntityControl(field: EntityFieldConfig, entity?: any) {
		let value: any;
		let entityValue =
			typeof entity === 'object'
				? entity && entity[field.key]
					? entity[field.key]
					: field.defaultValue
				: entity;

		if (field.type === 'checkbox') {
			const stringValue = entityValue || 'false';
			let booleanValue = stringValue;
			if (booleanValue === 'true' || booleanValue === 't') {
				booleanValue = true;
			} else if (booleanValue === 'false' || booleanValue === 'f') {
				booleanValue = false;
			}
			value = booleanValue;
		} else if (dateFieldTypes.includes(field.type)) {
			value = entityValue ? new Date(entityValue) : '';
		} else if (arrayFieldTypes.includes(field.type)) {
			value = this.createFormArrayItemControls(entityValue || [], field);
		} else {
			value = entityValue || null;
		}

		if (value instanceof FormArray) {
			return value;
		} else {
			const formControl = this.fb.control({
				value,
				disabled: field.disabled
			});

			if (field.required) {
				formControl.setValidators([Validators.required]);
			}

			return formControl;
		}
	}

	private createFormArrayItemControls(
		entities?: { value: any[] } & any[],
		field?: EntityFieldConfig
	) {
		let items = entities.value || entities;
		let controls = [];

		if (items.length && typeof items[0] === 'object') {
			const props = getUniqueProps(entities.value || entities).map((p) => {
				return {
					key: p,
					type: entities[0][p]
						? Array.isArray(entities[0][p])
							? 'array'
							: 'input'
						: 'input'
				};
			});
			(entities.value || entities || []).forEach((e) => {
				controls.push(this.createFormFromConfig(props, e));
			});
		} else {
			try {
				(entities.value || entities || []).forEach((e) => {
					controls.push(this.getEntityControl({ ...field, type: null }, e));
				});
			} catch (error) {
				console.warn(`WARNING: Entity value expected to be an array, but was a primitive...`);
				controls.push(
					this.getEntityControl({ ...field, type: null }, entities.value || entities)
				);
			}
		}

		return this.fb.array(controls || []);
	}
}
