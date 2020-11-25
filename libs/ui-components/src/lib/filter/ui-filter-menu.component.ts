import { KeyValue } from '@angular/common';
import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { UtilityService } from './../../../../utilities/src/lib/services/utility.service';
import { UIFilterService } from './ui-filter.service';

@Component({
	selector: 'ui-filter-menu',
	template: `
		<div class="container-wrapper">
			<div class="container-header mb-3 pb-1 border-bottom d-flex justify-content-between">
				<div class="d-flex align-items-center">
					<h5>Total: {{ uiFilterService.originalData.length }}</h5>
					<button
						pButton
						pRipple
						label="Reset all"
						icon="pi pi-refresh"
						class="p-button-warning ml-3"
						(click)="removeAllValues()"
					></button>
				</div>

				<div>
					<button
						pButton
						pRipple
						label="Apply filters"
						icon="pi pi-save"
						class=""
						(click)="applyFilters()"
						*ngIf="!uiFilterService.filterInstantly"
					></button>
				</div>
			</div>

			<div class="container-main" *ngIf="uiFilterService.filterForm">
				<ng-container *ngIf="uiFilterService.categoryMap; else uniqueProps">
					<div
						*ngFor="let cat of uiFilterService.categoryMap | keyvalue: orderByOrderAsc"
						class="p-shadow-1 justify-content-center"
					>
						<h4 class="w-100 bg-secondary text-white p-2">{{ cat.key }}</h4>

						<ui-filter-menu-list [uniqueProps]="cat.value.props"></ui-filter-menu-list>
					</div>
				</ng-container>

				<ng-template #uniqueProps>
					<ui-filter-menu-list
						[uniqueProps]="uiFilterService.uniqueProps"
					></ui-filter-menu-list>
				</ng-template>
			</div>
		</div>
	`,
	styles: [``],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UIFilterMenuComponent implements OnInit {
	@Input() data: any[];

	constructor(
		public uiFilterService: UIFilterService,
		public utilities: UtilityService,
		private dialogConfig: DynamicDialogConfig,
		private dialogRef: DynamicDialogRef
	) {
		if (this.dialogConfig?.data) {
			this.data = this.dialogConfig.data.data;
		}
	}

	ngOnInit(): void {}

	applyFilters() {
		this.uiFilterService.applyFilters();
		if (this.dialogRef) {
			this.dialogRef.close();
		}
	}

	removeAllValues() {
		this.utilities.handleUrlParameters({ paramsToDelete: ['filterState'] });
		setTimeout(() => {
			this.uiFilterService.setupFilterState(this.uiFilterService.originalData);
		}, 1);
	}

	orderByOrderAsc(
		a: KeyValue<number, { order: number; props: string[] }>,
		b: KeyValue<number, { order: number; props: string[] }>
	): number {
		return a.value.order === b.value.order ? 0 : a.value.order > b.value.order ? 1 : -1;
	}
}
