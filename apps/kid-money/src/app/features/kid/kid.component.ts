import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Kid } from '@entities';
import { DataService } from '@lib/data';

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
					<div class="mt-1 w-100">
						<p-card [header]="'Money'" styleClass="ui-card-shadow bg-white">
							<div class="w-100 border-top">
								<h4>
									{{ activeKid.money }}
								</h4>
							</div>
						</p-card>
					</div>

					<div class="mt-3 w-100">
						<p-card [header]="'Transactions'" styleClass="ui-card-shadow bg-white">
							<div class="w-100 border-top">
								<ul style="list-style:none;">
									<li *ngFor="let transaction of activeKid.transactions">
										{{ transaction.name }}
									</li>
								</ul>
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
