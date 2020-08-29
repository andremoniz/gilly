import { Component, Input, OnInit } from '@angular/core';

import { KMTransaction } from './../../../../../../../libs/entities/kid-money/km-transaction';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'kid-transaction-info',
	template: `
		<div
			class="p-col-12 d-flex align-items-center clickable"
			[routerLink]="['transaction', transaction.id]"
		>
			<div #transactionDate class="p-col-2">
				<small>
					{{ getTransactionDate(transaction) }}
				</small>
			</div>
			<div #transactionInfo class="p-col-8">
				<p>{{ transaction.name }}</p>
				<small *ngIf="transaction.type">
					{{ transaction.type }}
				</small>
			</div>
			<div #transactionMoney class="p-col-2 d-flex justify-content-end">
				<span [style.color]="transaction.cost ? 'red' : 'green'">
					{{ getTransactionMoney(transaction) }}
				</span>
			</div>
		</div>
	`,
	styles: [``]
})
export class KidTransactionInfoComponent implements OnInit {
	@Input() transaction: KMTransaction;

	constructor(private datePipe: DatePipe) {}

	ngOnInit(): void {}

	getTransactionDate(transaction: KMTransaction) {
		const date = transaction.transactionDate || transaction.createDate;
		return this.datePipe.transform(date, 'shortDate');
	}

	getTransactionMoney(transaction: KMTransaction) {
		if (transaction.cost) {
			return `-${transaction.cost}`;
		} else {
			return `${transaction.income}`;
		}
	}
}
