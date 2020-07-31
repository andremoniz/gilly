import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'libs/utilities/src/lib/services/utility.service';

import { DataImporterService } from './data-importer.service';

@Component({
	selector: 'data-importer-preview',
	template: `
		<div class="w-100 border-bottom pb-3 mb-3 d-flex justify-content-between">
			<h3>Data Import Preview</h3>
			<button
				nz-button
				class="bg-primary text-white"
				(click)="dataImporterService.uploadData()"
			>Import Data</button>
		</div>

		<ui-table
			*ngIf="dataImporterService.dataInput && dataImporterService.selectedTableFields"
			[data]="dataImporterService.dataInput"
			[displayOptions]="previewTableOptions"
		></ui-table>
	`,
	styles: [``]
})
export class DataImporterPreviewComponent implements OnInit {
	previewTableOptions;

	constructor(
		public dataImporterService: DataImporterService,
		private utilities: UtilityService
	) {}

	ngOnInit(): void {
		this.dataImporterService.tableFieldSelected$.subscribe((fields) => {
			this.previewTableOptions = this.getTableOptions(fields);
		});
	}

	getTableOptions(fields) {
		const columns = (fields || []).map((tf) => {
			return {
				name: this.utilities.prettyPrint(tf),
				prop: this.dataImporterService.getPropForField(tf)
			};
		});
		return {
			title: 'Preview',
			columns: columns
		};
	}
}
