import { FormControl } from '@angular/forms';
import { UIFieldBase } from './ui-field.base';

export class UIFieldMultiselectsBase extends UIFieldBase {
	source: any[];
	target: any[];

	constructor() {
		super();
	}

	generateValuesFromControl() {
		return (this.control.value || [])
			.map((v) => this.generateValue(v))
			.filter((v) => (v?.value ? v.value : v))
			.filter((v) => v);
	}

	private generateValue(v: any) {
		if (v.id) {
			return v;
		} else {
			const label = v[this.field.labelProp] || v.label || v;
			const value = v[this.field.valueProp] || v.value || v;

			if (label === value) {
				return value;
			} else {
				return {
					label,
					value
				};
			}
		}
	}

	updateControlValues(values: any[], sort?) {
		this.control.clear();

		let transformedValues = values
			.map((v) => v[this.field.valueProp] || v.value || v)
			.filter((v) => v);

		if (sort) {
			transformedValues = transformedValues.sort();
		}

		transformedValues.forEach((v) =>
			this.control.push(new FormControl({ value: v, disabled: this.field.disabled }))
		);
	}

	generateSourceWithoutTargets(options: any[], target: any[]) {
		let isIdComparison = false;
		const targetCompare = target.map((tOpt) => {
			if (tOpt.id) {
				isIdComparison = true;
				return tOpt.id;
			}
			return tOpt.value;
		});

		return options
			.filter((sOpt) => {
				if (isIdComparison) return !targetCompare.includes(sOpt.id);
				return !targetCompare.includes(sOpt[this.field.valueProp] || sOpt.value || sOpt);
			})
			.filter((s) => s)
			.map((s) => this.generateValue(s));
	}
}
