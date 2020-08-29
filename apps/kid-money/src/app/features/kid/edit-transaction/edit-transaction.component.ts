import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Kid } from '../../../../../../../libs/entities/kid-money/kid';
import { FormConfigService } from '../../../../../../../libs/utilities/src/lib/services/form-config.service';
import { DataService } from './../../../../../../../libs/data/src/lib/services/data/data.service';
import { KMTransaction } from './../../../../../../../libs/entities/kid-money/km-transaction';
import { KidService } from './../kid.service';

@Component({
	selector: 'edit-transaction',
	templateUrl: './edit-transaction.component.html',
	styles: [``]
})
export class EditTransactionComponent implements OnInit {
	transactionForm: FormGroup;
	transaction: KMTransaction;

	kids$: Subscription;
	activeKid: Kid;

	constructor(
		public dataService: DataService,
		public kidService: KidService,
		private formConfigService: FormConfigService,
		private router: Router,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.transaction = new KMTransaction();
		this.transactionForm = this.formConfigService.createFormFromConfig(
			KMTransaction.fieldConfig,
			this.transaction
		);

		const kids$ = this.dataService.selectAll('Kid').subscribe((kids: Kid[]) => {
			const kidId = this.route.snapshot.paramMap.get('id');
			const transactionId = this.route.snapshot.paramMap.get('tid');

			if (kidId && kids) {
				this.activeKid = kids.find((k) => k.id === kidId);
			}

			if (transactionId) {
				if (this.activeKid && this.activeKid.transactions) {
					this.transaction = this.activeKid.transactions.find(
						(t) => t.id === transactionId
					);

					this.transactionForm = this.formConfigService.createFormFromConfig(
						KMTransaction.fieldConfig,
						this.transaction
					);
				}
			}
		});
	}

	ngOnDestroy() {
		if (this.kids$) {
			this.kids$.unsubscribe();
		}
	}

	onSubmit() {
		this.kidService.saveTransaction(this.activeKid, this.transactionForm.value);
		this.router.navigate(['kid', this.activeKid.id]);
	}

	onDelete() {
		if (confirm(`Are you sure you want to delete this transaction?`)) {
			this.kidService.removeTransaction(this.activeKid, this.transaction);
			this.router.navigate(['kid', this.activeKid.id]);
		}
	}
}
