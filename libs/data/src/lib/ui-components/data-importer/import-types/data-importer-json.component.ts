import { Component, OnInit } from '@angular/core';
import { DataImporterService } from '../data-importer.service';
import { AbstractDataImporterType } from './data-importer-type.abstract';
import { getUniqueProps } from '../../../../../../utilities/src/lib/utilities/getUniqueProps';

@Component({
	selector: 'data-importer-json',
	template: `
		<div class="col-12">
			<h4><b>STEP 1</b> Paste or Upload JSON</h4>
		</div>
		<div class="col-12 mt-1">
			<input type="file" (change)="fileSelected($event)" />
		</div>
		<div class="col-12 mt-3 mb-5">
			<label>JSON Input</label>
			<textarea
				nz-input
				[(ngModel)]="dataInput"
				(input)="setDataInput($event)"
				rows=10
			></textarea>
		</div>
	`
})
export class DataImporterJSONComponent extends AbstractDataImporterType implements OnInit {
	constructor(public DIS: DataImporterService) {
		super();
	}

	ngOnInit() {}

	isImportDataValid(): boolean {
		return true;
	}

	setDataInput(data: any) {
		this.dataInput = data;
		try {
			const parsedData = JSON.parse(data);
			this.DIS.setDataInput(parsedData, getUniqueProps(parsedData));
		} catch (e) {
			this.DIS.setDataInput([], []);
		}
	}
}
