import { Component, OnInit } from '@angular/core';
import { DataImporterService } from '../data-importer.service';
import { AbstractDataImporterType } from './data-importer-type.abstract';
import { getUniqueProps } from '../../../../../../utilities/src/lib/utilities/getUniqueProps';

@Component({
	selector: 'data-importer-xml',
	template: `
		<div class="row">
			<div class="col-12">
				<h4><b>STEP 1</b> Paste or Upload XML Data</h4>
				<h6>Select the entity tag name</h6>
			</div>

			<div class="col-12 mt-1">
				<input type="file" (change)="fileSelected($event)" />
			</div>

			<div class="col-12 mt-3">
				<label>Entity Tag Name</label>
				<input nz-input [(ngModel)]="entityTagName" (input)="setDataInput($event)" />
			</div>

			<div class="col-12 mt-3 mb-5">
				<label>XML Input</label>
				<textarea
					nz-input
					[(ngModel)]="dataInput"
					rows=10
				></textarea>
			</div>
		</div>
	`
})
export class DataImporterXMLComponent extends AbstractDataImporterType implements OnInit {
	entityTagName: string;

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
			const parsedData = this.parseXML(data);
			this.DIS.setDataInput(parsedData, getUniqueProps(parsedData));
		} catch (e) {
			this.DIS.setDataInput([], []);
		}
	}

	parseXML(data): any[] {
		if (!this.entityTagName) return [];
		let parsedXML = [];
		try {
			const xmlParser = new DOMParser();
			const xmlDoc = xmlParser.parseFromString(data, 'text/xml');
			const entities = (<any>xmlDoc).getElementsByTagName(this.entityTagName);
			Array.from(entities).forEach((e: HTMLElement) => {
				const parsedXMLObj = {};
				Array.from(e.children).forEach((c: HTMLElement) => {
					parsedXMLObj[c.tagName] = c.textContent;
				});
				parsedXML.push(parsedXMLObj);
			});
		} catch (e) {
			// noop
		}
		return parsedXML;
	}
}
