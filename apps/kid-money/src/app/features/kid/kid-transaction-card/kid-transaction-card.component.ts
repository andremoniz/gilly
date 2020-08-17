import { Component, Input, OnInit } from '@angular/core';
import { Kid, KMTransaction } from '@entities';
import { SelectItem } from 'primeng/api/selectitem';

@Component({
	selector: 'kid-transaction-card',
	template: `
		<p-card [header]="'Transactions'" styleClass="bg-white">
			<div class="w-100 border-top">
				<p-dataView
					#transactionView
					[value]="activeKid.transactions"
					[paginator]="true"
					[rows]="5"
					paginatorPosition="bottom"
					filterBy="name,type"
					[sortField]="sortField"
					[sortOrder]="sortOrder"
				>
					<p-header>
						<div class="p-grid">
							<div class="p-col-12 p-md-12 d-flex justify-content-center">
								<p-dropdown
									[options]="sortOptions"
									[(ngModel)]="sortKey"
									placeholder="Sort By"
									(onChange)="onSortChange($event)"
									class="w-100"
								></p-dropdown>
							</div>

							<div class="p-col-12 p-md-12">
								<div class="p-inputgroup">
									<span class="p-inputgroup-addon">
										<i class="pi pi-search" style="line-height: 1.25;"> </i>
									</span>
									<input
										type="search"
										pInputText
										placeholder="Search Transactions"
										(input)="transactionView.filter($event.target.value)"
									/>
								</div>
							</div>
						</div>
					</p-header>

					<ng-template let-transaction pTemplate="listItem">
						<kid-transaction-info
							[transaction]="transaction"
							class="w-100"
						></kid-transaction-info>
					</ng-template>
				</p-dataView>
			</div>
		</p-card>
	`,
	styles: [``]
})
export class KidTransactionCardComponent implements OnInit {
	@Input() activeKid: Kid;

	sortOptions: SelectItem[] = [
		{ label: 'Newest First', value: '!createDate' },
		{ label: 'Oldest First', value: 'createDate' },
		{ label: 'Name', value: 'name' },
		{ label: 'Type', value: 'type' },
		{ label: 'Cost', value: 'cost' },
		{ label: 'Income', value: 'income' }
	];
	sortField: string;
	sortOrder: number;
	sortKey: string;

	constructor() {}

	ngOnInit(): void {}

	onSortChange(event) {
		let value = event.value;

		if (value.indexOf('!') === 0) {
			this.sortOrder = -1;
			this.sortField = value.substring(1, value.length);
		} else {
			this.sortOrder = 1;
			this.sortField = value;
		}
	}
}
