import { Component, EventEmitter, Input, OnInit, Output, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

import { FilterSortService } from './../../../../utilities/src/lib/services/filter-sort.service';
import { UIFilterMenuComponent } from './ui-filter-menu.component';
import { UIFilterService } from './ui-filter.service';

@Component({
	selector: 'ui-filter',
	template: `
		<div class="w-100">
			<!-- <nz-input-group nzSearch [nzAddOnAfter]="suffixIconButton">
				<input [formControl]="filterControl" type="text" nz-input placeholder="Search..." />
			</nz-input-group> -->
			<ng-template #suffixIconButton>
				<button
					nz-button
					class="bg-primary text-white"
					nzSearch
					(click)="showFilterDialog()"
				>
					<i nz-icon nzType="search"></i>
				</button>
			</ng-template>
		</div>
	`,
	styles: [``],
	providers: [UIFilterService]
})
export class UIFilterComponent implements OnInit {
	dataFiltered$;
	filterControl: FormControl;

	@Input()
	set data(d: any[]) {
		this.uiFilterService.setFilterData(d);
	}
	get data(): any[] {
		return this.uiFilterService.filteredData;
	}

	@Output() filteredData = new EventEmitter<any[]>();
	@Output() filterValue = new EventEmitter<any>();

	constructor(
		public uiFilterService: UIFilterService,
		private cdRef: ChangeDetectorRef,
		private fs: FilterSortService,
		private viewContainerRef: ViewContainerRef
	) {}

	ngOnInit(): void {
		this.filterControl = new FormControl('');

		this.filterControl.valueChanges.pipe(debounceTime(200)).subscribe((value) => {
			this.filterValue.emit(value);

			if (!value || value === '') {
				this.filteredData.emit((this.uiFilterService.originalData || []).slice());
			} else {
				this.filteredData.emit(
					this.fs.search(this.uiFilterService.originalData, value, null, [
						'id',
						'version'
					])
				);
			}
		});

		this.dataFiltered$ = this.dataFiltered$ = this.uiFilterService.dataFiltered$.subscribe(
			(data) => {
				this.filteredData.next(data);
				this.cdRef.detectChanges();
			}
		);
	}

	showFilterDialog() {
		// const modal = this.modal.create({
		// 	nzTitle: 'Filter Menu',
		// 	nzContent: UIFilterMenuComponent,
		// 	nzViewContainerRef: this.viewContainerRef,
		// 	nzComponentParams: {
		// 		data: this.uiFilterService.originalData
		// 	},
		// 	nzWidth: '75%',
		// 	nzBodyStyle: {
		// 		height: '75vh',
		// 		overflowY: 'auto'
		// 	},
		// 	nzFooter: [
		// 		{
		// 			label: 'Close',
		// 			onClick: () => modal.destroy()
		// 		}
		// 	]
		// });

		// const instance = modal.getContentComponent();
	}
}
