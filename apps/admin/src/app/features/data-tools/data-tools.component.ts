import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'data-tools',
	template: `
		<lib-page-container>
			<ng-template #header>
				<div class="container-fluid w-100 border-bottom d-flex justify-content-between">
					<h2>Data Tools</h2>
					<div #dataToolsButtons></div>
				</div>
			</ng-template>
			<ng-template #main>
				<div class="d-flex w-100">
					<nz-card
						class="w-50 ml-3 mr-3"
						[nzHoverable]="true"
						[routerLink]="['./export-manager']"
					>
						<nz-card-meta
							[nzTitle]="'Export Manager'"
							[nzDescription]="
								'Export data from a system entity into various formats (Excel, CSV, JSON, etc.).'
							"
						>
						</nz-card-meta
					></nz-card>
					<nz-card
						class="w-50 ml-3 mr-3"
						[nzHoverable]="true"
						[routerLink]="['./data-importer']"
					>
						<nz-card-meta
							[nzTitle]="'Data Importer'"
							[nzDescription]="
								'Import data from various sources into a system entity.'
							"
						>
						</nz-card-meta
					></nz-card>
				</div>
			</ng-template>
		</lib-page-container>
	`,
	styles: [``]
})
export class DataToolsComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}
}
