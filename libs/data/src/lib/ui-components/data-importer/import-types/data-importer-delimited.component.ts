import { Component, OnInit } from '@angular/core';
import { DataImporterService } from '../data-importer.service';
import { AbstractDataImporterType } from './data-importer-type.abstract';

@Component({
	selector: 'data-importer-delimited',
	template: `
		<div class="col-12">
			<h4><b>STEP 1</b> Paste or Upload Delimited Data</h4>
			<h6>Assumes first row is headers!</h6>
		</div>

		<div class="col-12 mt-1">
			<input type="file" (change)="fileSelected($event)" />
		</div>

		<div class="col-12 mt-3">
			<label>Delimiter</label>
			<nz-select [(ngModel)]="delimiter" (ngModelChange)="delimiterChange($event)">
				<nz-option
					*ngFor="let do of delimitTypes"
					[nzLabel]="do.label"
					[nzValue]="do.delimit"
				>
				</nz-option>
			</nz-select>
		</div>

		<div class="col-12 mt-3 mb-5">
			<label>Delimited Input</label>
			<textarea
				nz-input
				[(ngModel)]="dataInput"
				(input)="setDataInput($event)"
				rows=10
			></textarea>
		</div>
	`
})
export class DataImporterDelimitedComponent extends AbstractDataImporterType implements OnInit {
	delimitTypes: { label: string; delimit: string }[] = [
		{ label: 'Comma (,)', delimit: ',' },
		{ label: 'Semi-Colon (;)', delimit: ';' },
		{ label: 'Pipe (|)', delimit: '|' },
		{ label: 'Tab (    )', delimit: '    ' }
	];

	delimiter = ',';

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
			let parsedData = [];
			const rows = data.split('\n');
			let uniqueProps = this.getUniqueProps(rows);
			rows.forEach((r) => {
				const rowValues = r.split(this.delimiter);
				const parsedObj = {};
				uniqueProps.forEach((p, i) => (parsedObj[p] = rowValues[i]));
				parsedData.push(parsedObj);
			});

			this.DIS.setDataInput(parsedData.slice(1, parsedData.length), uniqueProps);
		} catch (e) {
			this.DIS.setDataInput([], []);
		}
	}

	getUniqueProps(rows): string[] {
		return rows[0].split(this.delimiter);
	}

	delimiterChange(event) {
		this.setDataInput(this.dataInput);
	}
}
