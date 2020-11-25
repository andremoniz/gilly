import { FormGroup } from '@angular/forms';

import { EntityFieldConfig } from '../../../../../../entities/entity-field-config';
import { isValueInValueExpressions } from './../../../../../../utilities/src/lib/utilities/filters/isValueInValueExpressions';

export const handleFieldVisibility = (field: EntityFieldConfig, group: FormGroup) => {
	if (!field.visibilityProp && !field.visibilityExpression) return true;

	if (field.visibilityProp && field.visibilityValues) {
		const visibilityExpression = [];
		field.visibilityValues.forEach((visValue) => {
			visibilityExpression.push({ prop: field.visibilityProp, value: visValue });
		});
		field.visibilityExpression = visibilityExpression;
	}

	const visible = handleVisbilityExpression(field, group?.value);
	Array.from(new Set(field.visibilityExpression.map((ve) => ve.prop)))
		.filter((v) => v)
		.forEach((visProp) => {
			group.get(visProp).valueChanges.subscribe((value) => {
				field.visible = handleVisbilityExpression(field, value);
			});
		});

	return visible;
};

const handleVisbilityExpression = (field: EntityFieldConfig, value: any) => {
	if (!field.visibilityExpression) return !field.visible ? true : field.visible;
	return isValueInValueExpressions(field.visibilityExpression, value);
};
