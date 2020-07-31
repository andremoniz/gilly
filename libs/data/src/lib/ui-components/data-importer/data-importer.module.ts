import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UITableModule } from 'libs/ui-components/src/lib/visualization/table/ui-table.module';
import { NzAutocompleteModule, NzIconModule, NzProgressModule, NzStepsModule, NzResultModule } from 'ng-zorro-antd';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { DataImporterInputComponent } from './data-importer-input.component';
import { DataImporterOutputComponent } from './data-importer-output.component';
import { DataImporterPreviewComponent } from './data-importer-preview.component';
import { DataImporterComponent } from './data-importer.component';
import { DataImporterService } from './data-importer.service';
import { DataImporterDelimitedComponent } from './import-types/data-importer-delimited.component';
import { DataImporterExcelComponent } from './import-types/data-importer-excel.component';
import { DataImporterJSONComponent } from './import-types/data-importer-json.component';
import { DataImporterURLComponent } from './import-types/data-importer-url.component';
import { DataImporterXMLComponent } from './import-types/data-importer-xml.component';
import { DataImporterCompleteComponent } from './data-importer-complete.component';

@NgModule({
	declarations: [
		DataImporterComponent,

		DataImporterDelimitedComponent,
		DataImporterExcelComponent,
		DataImporterJSONComponent,
		DataImporterURLComponent,
		DataImporterXMLComponent,

		DataImporterInputComponent,
		DataImporterOutputComponent,
		DataImporterPreviewComponent,
		DataImporterCompleteComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,

		UITableModule,

		NzButtonModule,
		NzProgressModule,
		NzSelectModule,
		NzInputModule,
		NzCollapseModule,
		NzStepsModule,
		NzIconModule,
		NzAutocompleteModule,
		NzResultModule
	],
	exports: [DataImporterComponent],
	providers: [DataImporterService]
})
export class DataImporterModule {}
