import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { UIFilterService } from './ui-filter.service';

@Component({
	selector: 'ui-filter-chip',
	template: `
		<ng-container
			*ngIf="uiFilterService.propTypeMap[filter] === 'date'; else defaultFilterButtons"
		>
			<span
				class="p-overlay-badge"
				(click)="uiFilterService.removeFilterValue(filter, filterValue)"
			>
				<span class="p-tag clickable filter-tag">
					{{ filterValue | prettyPrintDaterange }}
				</span>
			</span>
		</ng-container>

		<ng-template #defaultFilterButtons>
			<span
				class="p-overlay-badge mr-2 clickable "
				*ngFor="let value of filterValue"
				(click)="uiFilterService.removeFilterValue(filter, value)"
			>
				<span class="p-tag filter-tag">
					{{ value ? value : '~None~' }}
				</span>
				<span class="p-badge p-badge-primary">
					{{
						uiFilterService.uniqueValues[filter].uniqueValues[
							value === '' ? '~None~' : value
						].count
					}}
				</span>
			</span>
		</ng-template>
	`,
	styles: [
		`
			.filter-tag {
				background-color: var(--secondary) !important;
				color: white !important;
			}
		`
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UIFilterChipComponent implements OnInit {
	@Input() filter: string;
	@Input() filterValue: string[];

	constructor(public uiFilterService: UIFilterService) {}

	ngOnInit(): void {}
}
