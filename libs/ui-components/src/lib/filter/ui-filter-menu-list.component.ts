import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { endOfMonth, endOfYear, startOfMonth, startOfYear } from 'date-fns';

import { UIFilterService } from './ui-filter.service';

@Component({
	selector: 'ui-filter-menu-list',
	template: `
		<form [formGroup]="uiFilterService.filterForm" class="filter-list">
			<div class="filter-list-item border" *ngFor="let filterProp of uniqueProps">
				<div
					class="filter-list-content"
					*ngIf="uiFilterService.uniqueValues[filterProp] as uniqueFilterValues"
				>
					<div
						class="p-1 w-100 d-flex justify-content-between"
						style="background-color:var(--primary-color);"
					>
						<h5 class="text-white ml-1">
							{{ filterProp | prettyPrint }}
						</h5>

						<div
							class="d-flex align-items-center"
							*ngIf="uiFilterService.propTypeMap[filterProp] !== 'date'"
						>
							<p-selectButton
								[options]="[
									{ icon: 'pi pi-sort-alpha-down', value: 'abc' },
									{ icon: 'pi pi-sort-amount-up', value: 'count' }
								]"
								[formControl]="uniqueFilterValues.sortByControl"
								[style.font-size]="'0.75rem'"
							>
								<ng-template let-item>
									<i [class]="item.icon"></i>
								</ng-template>
							</p-selectButton>
						</div>
					</div>

					<ng-container [ngSwitch]="uiFilterService.propTypeMap[filterProp]">
						<ng-container *ngSwitchCase="'date'">
							<div [formGroupName]="filterProp" class="mt-3">
								<p-calendar
									appendTo="body"
									selectionMode="range"
									[style]="{ width: '100%' }"
									class="mt-1"
									[formControlName]="filterProp"
									[showIcon]="true"
									[monthNavigator]="true"
									[yearNavigator]="true"
									yearRange="1950:2050"
									[showTime]="true"
									[showButtonBar]="true"
								></p-calendar>

								<div class="d-flex justify-content-end">
									<p
										class="clickable"
										style="font-size: 0.9rem; color: blue;"
										(click)="clearDateInput($event, filterProp)"
									>
										Clear
									</p>
								</div>
							</div>
						</ng-container>

						<ng-container *ngSwitchDefault>
							<div
								class="d-flex flex-column unique-value-list mt-1"
								[formGroupName]="filterProp"
								*ngIf="uniqueFilterValues.uniqueValues as uniqueValues"
							>
								<ng-container
									*ngFor="
										let v of uniqueValues
											| keyvalue
											| sortUniqueValues
												: uniqueFilterValues.sortByControl.value;
										let i = index
									"
								>
									<div
										*ngIf="i <= 4 || uniqueFilterValues.showMore"
										class="p-field-checkbox"
									>
										<p-checkbox
											[formControlName]="v.key"
											[inputId]="filterProp + v.key + i"
											binary="true"
										>
										</p-checkbox>

										<label
											class="d-flex w-100 justify-content-between align-items-center clickable"
											[for]="filterProp + v.key + i"
										>
											<div>
												{{ v.key.length > 25 ? v.key.slice(0, 25) : v.key }}
											</div>
											<div style="font-size: 0.8rem;">
												<span style="font-weight:700;">
													{{ v.value.count }}
												</span>
												<small
													class="ml-1"
													style="font-size:0.75rem;"
													[style.color]="
														v.value.percent | getColorForPercentage
													"
												>
													({{ v.value.percent * 100 | number: '1.1-2' }}%)
												</small>
											</div>
										</label>
									</div>
									<p
										*ngIf="i === 4 && !uniqueFilterValues.showMore"
										class="clickable"
										style="font-size: 0.9rem; color: blue;"
										(click)="
											uiFilterService.uniqueValues[
												filterProp
											].showMore = !uniqueFilterValues.showMore
										"
									>
										Show More...
									</p>
									<p
										*ngIf="i === 4 && uniqueFilterValues.showMore"
										class="clickable"
										style="font-size: 0.9rem; color: blue;"
										(click)="
											uiFilterService.uniqueValues[
												filterProp
											].showMore = !uniqueFilterValues.showMore
										"
									>
										Show Less...
									</p>
								</ng-container>
							</div>
						</ng-container>
					</ng-container>
				</div>
			</div>
		</form>
	`,
	styles: [
		`
			:host {
				width: 100% !important;
			}

			.filter-list {
				display: grid;
				overflow: hidden;
				grid-template-columns: repeat(4, 1fr);
				/* grid-auto-rows: 1fr; */
				grid-row-gap: 0.1rem;
				grid-column-gap: 0.5rem;
				margin-left: 1rem;
				margin-right: 1rem;
			}

			.filter-list-item {
				display: flex;
				padding: 0.5rem;
				margin-bottom: 1rem;
			}

			.filter-list-content {
				width: 100%;
			}

			.unique-value-list {
				overflow-y: auto;
				max-height: 250px;
			}

			.ant-checkbox-wrapper {
				margin-left: 0px !important;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}

			::ng-deep label > span:nth-child(2) {
				display: flex;
				justify-content: space-between;
				width: 100% !important;
			}

			::ng-deep label > span {
				align-items: center;
			}

			::ng-deep .p-field-checkbox {
				margin-bottom: 0.25rem !important;
			}
		`
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UIFilterMenuListComponent implements OnInit {
	@Input() uniqueProps: any;

	constructor(public uiFilterService: UIFilterService) {}

	ngOnInit(): void {}

	clearDateInput(event, prop) {
		const resetValue = {};
		resetValue[`${prop}`] = false;

		this.uiFilterService.filterForm.get(prop).setValue(resetValue);
	}
}
