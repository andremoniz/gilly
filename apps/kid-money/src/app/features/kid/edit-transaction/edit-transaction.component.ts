import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { DataService } from './../../../../../../../libs/data/src/lib/services/data/data.service';

@Component({
	selector: 'edit-transaction',
	template: `Edit Transaction`,
	styles: [``]
})
export class EditTransactionComponent implements OnInit {
	constructor(
		public dataService: DataService,
		private fb: FormBuilder,
		private router: Router,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.route.paramMap.subscribe((params) => {
			const transactionId = params.get('tid');
			if (transactionId) {
			}
		});
	}
}
