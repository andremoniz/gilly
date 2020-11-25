import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { UIFieldMultiselectsBase } from '../ui-field-multiselects.base';

@Component({
	selector: 'ui-field-picklist',
	template: `
		<p-pickList
			[source]="source"
			[target]="target"
			sourceHeader="Available"
			targetHeader="Selected"
			dragdrop="true"
			(onMoveToTarget)="handleItemMove($event, 'moveToTarget')"
			(onMoveToSource)="handleItemMove($event, 'moveToSource')"
			(onTargetReorder)="handleItemMove($event, 'targetReorder')"
		>
			<ng-template let-item pTemplate="item">
				<p>
					{{
						item[this.field.labelProp] ||
							item[this.field.valueProp] ||
							item.value ||
							item.label ||
							item
					}}
				</p>
			</ng-template>
		</p-pickList>
	`,
	styles: [``]
})
export class UIFieldPicklistPrimeNGComponent extends UIFieldMultiselectsBase
	implements OnInit, OnDestroy {
	private options$;

	constructor() {
		super();
	}

	ngOnInit(): void {
		this.target = this.generateValuesFromControl();

		this.options$ = (<Observable<any[]>>this.field.options).subscribe((options) => {
			this.source = this.generateSourceWithoutTargets(options, this.target);
		});
	}

	ngOnDestroy() {
		if (this.options$) this.options$.unsubscribe();
	}

	handleItemMove(event, method) {
		this.updateControlValues(this.target);
	}
}
