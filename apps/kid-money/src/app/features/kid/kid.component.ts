import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Kid } from '@entities';
import { DataService } from '@lib/data';

@Component({
	selector: 'kid',
	template: `
		<ng-container *ngIf="dataService.selectActive('Kid') as activeKid; else createKid">
			<lib-page-container>
				<ng-template #header>
					<p-toolbar class="w-100">
						<div class="w-100 d-flex align-items-center justify-content-between">
							<div class="text-white">
								<h4>
									{{ getKidFullName(activeKid) }}
								</h4>
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
				<ng-template #main> </ng-template>
			</lib-page-container>
		</ng-container>
		<ng-template #createKid>
			CREATE KID
		</ng-template>
	`,
	styles: [``]
})
export class KidComponent implements OnInit {
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
}
