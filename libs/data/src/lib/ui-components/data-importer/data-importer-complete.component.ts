import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { DataImporterService } from './data-importer.service';

@Component({
	selector: 'data-importer-complete',
	template: `
		<!-- <nz-result
			nzStatus="success"
			nzTitle="Successfully Imported {{ dataImporterService.selectedImportType }} into {{
				dataImporterService.targetTable
			}}!"
			nzSubTitle="A total of {{ dataImporterService.transformedData?.length }} items were imported."
		>
			<div nz-result-extra>
				<button nz-button (click)="importAgain.emit(true)">Import Again</button>
				<button nz-button class="bg-primary text-white" (click)="exit.emit(true)">
					Exit
				</button>
			</div>
		</nz-result> -->
	`,
	styles: [``]
})
export class DataImporterCompleteComponent implements OnInit {
	@Output() importAgain = new EventEmitter<boolean>();
	@Output() exit = new EventEmitter<boolean>();

	constructor(public dataImporterService: DataImporterService) {}

	ngOnInit(): void {}
}
