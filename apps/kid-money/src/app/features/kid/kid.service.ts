import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { take } from 'rxjs/operators';

import { Kid } from '../../../../../../libs/entities/kid-money/kid';
import { KMTransaction } from '../../../../../../libs/entities/kid-money/km-transaction';
import { DataService } from './../../../../../../libs/data/src/lib/services/data/data.service';

@Injectable({ providedIn: 'root' })
export class KidService {
	constructor(private dataService: DataService, private messageService: MessageService) {}

	saveKid(kid: Kid) {
		this.dataService
			.save(Kid, kid)
			.pipe(take(1))
			.subscribe((res: Kid) => {
				this.messageService.add({
					severity: 'success',
					summary: 'Saved',
					detail: `Successfully saved ${res.fullName}`
				});
				console.log('SAVE:', res);
			});
	}

	deleteKid(kid: Kid) {
		this.dataService
			.delete(Kid, kid)
			.pipe(take(1))
			.subscribe((res) => {
				console.log('DELETE:', res);
			});
	}

	saveTransaction(kid: Kid, transaction: KMTransaction) {
		if (!transaction.id) {
			kid.transactions.push({ ...transaction, kid: <any>kid.id });
		} else {
			const transactionToUpdate = kid.transactions.find((t) => t.id === transaction.id);
			Object.assign(transactionToUpdate, transaction);
		}
		this.saveKid(kid);
	}

	removeTransaction(kid: Kid, transaction: KMTransaction) {
		if (!kid.transactions) return;
		kid.transactions = kid.transactions.filter((t) => t.id !== transaction.id);
		this.saveKid(kid);
	}
}
