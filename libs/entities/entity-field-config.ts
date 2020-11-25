import { Observable } from 'rxjs';

import { ValueExpression } from './../utilities/src/lib/utilities/filters/isValueInValueExpressions';

export interface EntityFieldConfig {
	key?: string;
	label?: string;
	type?: string;
	className?: string;
	placeholder?: string;
	tooltip?: string;
	defaultValue?: any;
	required?: boolean;
	disabled?: boolean;
	visible?: boolean;
	hidden?: boolean;
	order?: number;

	// Visibiility
	visibilityExpression?: ValueExpression[];
	visibilityProp?: string;
	visibilityValues?: string[];

	// SELECT
	options?: any[] | Observable<any[]>;
	groupOptions?: boolean;
	labelProp?: string;
	valueProp?: string;
	editable?: boolean;
	optionQueryName?: string;
	optionSortProp?: string;

	// TABLE
	tableConfig?: EntityFieldConfig[];
	tableSortProp?: string;
}
