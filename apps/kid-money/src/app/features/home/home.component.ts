import { Component, OnInit } from '@angular/core';
import { DataService } from '@lib/data';

@Component({
	selector: 'km-home',
	template: `
		<lib-page-container [fluidMain]="false">
			<ng-template #header>
				<!-- <h2 class="ml-3">Kids</h2> -->
			</ng-template>
			<ng-template #main>
				<div class="d-flex flex-wrap">
					<kid-overview-card
						[kid]="kid"
						*ngFor="let kid of dataService.selectAll('Kid') | async"
						class="col-lg-4 col-sm-12"
					></kid-overview-card>
				</div>
			</ng-template>
		</lib-page-container>
	`,
	styles: [``]
})
export class KMHomeComponent implements OnInit {
	constructor(public dataService: DataService) {}

	ngOnInit(): void {}
}
