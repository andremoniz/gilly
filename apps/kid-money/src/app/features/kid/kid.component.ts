import { Component, OnInit } from '@angular/core';
import { DataService } from '@lib/data';

@Component({
	selector: 'kid',
	template: `
		<ng-container *ngIf="dataService.selectActive('Kid') as activeKid; else createKid">
			<lib-page-container>
				<ng-template #header>
					<p-toolbar class="w-100">
						<div class="ui-toolbar-group-left"></div>

						<div class="ui-toolbar-group-right">
							<button
								pButton
								#createTransaction
								type="button"
								icon="pi pi-plus"
								(click)="createTransaction()"
							></button>
						</div>
					</p-toolbar>
				</ng-template>
				<ng-template #main>
					{{ activeKid.firstName }}
				</ng-template>
			</lib-page-container>
		</ng-container>
		<ng-template #createKid>
			CREATE KID
		</ng-template>
	`,
	styles: [``]
})
export class KidComponent implements OnInit {
	constructor(public dataService: DataService) {}

	ngOnInit(): void {}

	createTransaction() {
		console.log('Create Transaction!');
	}
}
