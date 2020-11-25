import { arrayFieldTypes } from './../ui-field.base';
import { isObservable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { EntityFieldConfig } from '../../../../../../entities/entity-field-config';
import { prettyPrint } from '../../../../../../utilities/src';

export const setupFieldOptions = (field: EntityFieldConfig) => {
	const options = field.options;

	if (isObservable(options)) {
		return options.pipe(
			take(1),
			map((opts) => setupOptions(opts, field))
		);
	} else {
		return of(setupOptions(options, field));
	}
};

const setupOptions = (options: any[], field: EntityFieldConfig) => {
	let transformedOptions = [];
	if (!arrayFieldTypes.includes(field.type)) {
		transformedOptions.push({ label: '', value: null });
	}

	const tOpts = (options || [])
		.filter((option) => option)
		.map((option) => setupOptionObject(option, field));

	transformedOptions = transformedOptions.concat(...sortOptions(tOpts, field));
	return transformedOptions;
};

const setupOptionObject = (option: any, field: EntityFieldConfig) => {
	const transformedOption: { label: string; value: any; items?: any[] } = {
		label: getOptionLabel(option, field),
		value: getOptionValue(option, field)
	};

	if (option?.items) {
		transformedOption.items = option.items;
	}

	return transformedOption;
};

const getOptionLabel = (option: any, field: EntityFieldConfig) => {
	let optLabel;

	if (field?.labelProp) {
		optLabel = option[field.labelProp];
	} else if (option?.optLabel) {
		optLabel = option?.optLabel;
	} else if (option?.label) {
		optLabel = option.label;
	} else if (option?.key) {
		optLabel = prettyPrint(option.key);
	} else {
		optLabel = option;
	}

	return optLabel;
};

const getOptionValue = (option: any, field: EntityFieldConfig) => {
	let optValue;

	if (field?.valueProp) {
		optValue = option[field.valueProp];
	} else if (option?.optValue) {
		optValue = option.optValue;
	} else if (option?.value) {
		optValue = option.value;
	} else if (option?.optLabel) {
		optValue = option.optLabel;
	} else {
		optValue = option;
	}

	return optValue;
};

const sortOptions = (options: any, field: EntityFieldConfig): any[] => {
	return options.sort((a, b) => {
		const aVal = field.optionSortProp ? a[field.optionSortProp] : a.label ? a.label : a,
			bVal = field.optionSortProp ? b[field.optionSortProp] : b.label ? b.label : b;
		return aVal === bVal ? 0 : aVal > bVal ? 1 : -1;
	});
};
