import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Kid } from '@entities';
import { DataService } from '@lib/data';
import { SelectItem } from 'primeng/api/selectitem';

import { KMTransaction } from './../../../../../../libs/entities/kid-money/km-transaction';

@Component({
	selector: 'kid',
	template: `
		<ng-container *ngIf="dataService.selectActive('Kid') as activeKid; else createKid">
			<lib-page-container [fluidMain]="false">
				<ng-template #header>
					<p-toolbar class="w-100">
						<div class="w-100 d-flex align-items-center justify-content-between">
							<div class="text-white">
								<span style="font-size:1.5rem;font-weight:bold;">{{
									getKidFullName(activeKid)
								}}</span>
							</div>

							<div>
								<button
									pButton
									type="button"
									icon="pi pi-plus"
									(click)="createTransaction()"
								></button>
							</div>
						</div>
					</p-toolbar>
				</ng-template>
				<ng-template #main>
					<div class="mt-3 w-100">
						<p-card [header]="'Money'" styleClass="ui-card-shadow bg-white">
							<div class="w-100 border-top">
								<h4>
									{{ activeKid.money }}
								</h4>
							</div>
						</p-card>
					</div>

					<div class="mt-3 mb-3 w-100">
						<p-card [header]="'Transactions'" styleClass="ui-card-shadow bg-white">
							<div class="w-100 border-top">
								<p-dataView
									#transactionView
									[value]="activeKid.transactions"
									[paginator]="true"
									[rows]="5"
									paginatorPosition="both"
									filterBy="name,type"
									[sortField]="sortField"
									[sortOrder]="sortOrder"
								>
									<p-header>
										<div class="p-grid">
											<div
												class="p-col-12 p-md-12 d-flex justify-content-center"
											>
												<p-dropdown
													[options]="sortOptions"
													[(ngModel)]="sortKey"
													placeholder="Sort By"
													(onChange)="onSortChange($event)"
													class="w-100"
												></p-dropdown>
											</div>

											<div class="p-col-12 p-md-12">
												<div class="ui-inputgroup w-100">
													<span class="ui-inputgroup-addon">
														<i
															class="pi pi-search"
															style="line-height: 1.25;"
														>
														</i>
													</span>
													<input
														type="search"
														pInputText
														placeholder="Search Transactions"
														(input)="
															transactionView.filter(
																$event.target.value
															)
                                                        "
                                                        class="w-100"
													/>
												</div>
											</div>
										</div>
									</p-header>

									<ng-template let-transaction pTemplate="listItem">
										<div class="p-col-12 d-flex clickable">
											<div #transactionDate class="p-col-2">
												<small>
													{{ transaction.createDate | date: 'shortDate' }}
												</small>
											</div>
											<div #transactionInfo class="p-col-8">
												<p>{{ transaction.name }}</p>
												<small *ngIf="transaction.type">
													{{ transaction.type }}
												</small>
											</div>
											<div
												#transactionMoney
												class="p-col-2 d-flex justify-content-end"
											>
												<span
													[style.color]="
														transaction.cost ? 'red' : 'green'
													"
												>
													{{ getTransactionMoney(transaction) }}
												</span>
											</div>
										</div>
									</ng-template>
								</p-dataView>
							</div>
						</p-card>
					</div>
				</ng-template>
			</lib-page-container>
		</ng-container>
		<ng-template #createKid>
			CREATE KID
		</ng-template>
	`,
	styles: [
		`
			body .ui-dropdown {
				width: 100%;
			}
		`
	],
	encapsulation: ViewEncapsulation.None
})
export class KidComponent implements OnInit {
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

	constructor(
		public dataService: DataService,
		private router: Router,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.route.params.subscribe((params) => {
			const kidId = params['id'];
			this.dataService.setActive(Kid, kidId);
		});
	}

	getKidFullName(kid: Kid) {
		return Kid.getKidFullName(kid);
	}

	createTransaction() {
		console.log('Create Transaction!');
	}

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

	getTransactionMoney(transaction: KMTransaction) {
		if (transaction.cost) {
			return `-${transaction.cost}`;
		} else {
			return `${transaction.income}`;
		}
	}
}
