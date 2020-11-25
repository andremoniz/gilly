import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewContainerRef,
} from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';

import { UIFilterMenuComponent } from './ui-filter-menu.component';
import { UIFilterService } from './ui-filter.service';

@Component({
	selector: 'ui-filter',
	template: `
		<div class="w-100 d-flex justify-content-between">
			<div class="d-flex align-items-center">
				<span
					*ngIf="uiFilterService.filterProps && uiFilterService.filterProps.length"
					class="mr-2"
					style="font-weight:700"
				>
					Filtered By:
				</span>

				<div *ngFor="let filter of uiFilterService.filterProps" class="mr-3">
					<ng-container *ngIf="uiFilterService.valuesToFilter[filter] as filterValue">
						<div class="filter-prop">
							{{ filter | prettyPrint }}
						</div>

						<ui-filter-chip
							[filter]="filter"
							[filterValue]="filterValue"
						></ui-filter-chip>
					</ng-container>
				</div>
			</div>

			<div class="d-flex align-items-center">
				<div class="p-inputgroup ml-auto">
					<!-- <span class="p-inputgroup-addon"><i class="pi pi-search"></i></span> -->
					<input
						type="text"
						pInputText
						placeholder="Search..."
						style="width:128px;"
						[formControl]="uiFilterService.searchControl"
					/>
					<button
						pButton
						pRipple
						label="Filters"
						icon="pi pi-filter"
						(click)="showFilterDialog()"
					></button>
				</div>
			</div>
		</div>
	`,
	styles: [
		`
			:host {
				width: 100%;
			}

			.filter-prop {
				font-size: 1rem;
				font-weight: 700;
				border-bottom: 1px solid grey;
				margin-bottom: 0.25rem;
			}
		`
	],
	providers: [],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UIFilterComponent implements OnInit, OnDestroy {
	dataFiltered$;
	searchValue$;

	@Input()
	set data(d: any[]) {
		this.uiFilterService.setupFilterState(d);
	}

	_config: UIFilterConfig;
	@Input()
	set config(c: UIFilterConfig) {
		this._config = c;

		if (c.filterProps) {
			this.uiFilterService.uniqueProps = c.filterProps;
		} else if (c.categoryMap) {
			this.uiFilterService.categoryMap = c.categoryMap;
		}
		this.uiFilterService.setupFilterState(c.data);
	}
	get config(): UIFilterConfig {
		return this._config;
	}

	@Output() filteredData = new EventEmitter<any[]>();
	@Output() filterValue = new EventEmitter<any>();

	constructor(
		public uiFilterService: UIFilterService,
		private cdRef: ChangeDetectorRef,
		private dialogService: DialogService,
		private viewContainerRef: ViewContainerRef
	) {}

	ngOnInit(): void {
		this.dataFiltered$ = this.uiFilterService.dataFiltered$.subscribe((data) => {
			this.filteredData.emit(data);
			this.cdRef.detectChanges();
		});

		this.searchValue$ = this.uiFilterService.searchValue$.subscribe((value) => {
			this.filterValue.emit(value);
		});
	}

	ngOnDestroy() {
		if (this.dataFiltered$) {
			this.dataFiltered$.unsubscribe();
		}
		if (this.searchValue$) {
			this.searchValue$.unsubscribe();
		}
	}

	showFilterDialog() {
		const ref = this.dialogService.open(UIFilterMenuComponent, {
			data: {
				data: this.uiFilterService.originalData
			},
			header: `Filter Menu`,
			width: '75%',
			height: '100%',
			dismissableMask: true
		});
	}
}

interface UIFilterConfig {
	data: any[];
	filterProps?: string[];
	categoryMap?: CategoryMap;
	filterInstantly?: boolean;
}

interface CategoryMap {
	[category: string]: { order: number; props: string[] };
}
