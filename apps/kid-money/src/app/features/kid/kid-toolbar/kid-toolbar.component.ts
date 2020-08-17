import { KidService } from './../kid.service';
import { DataService } from '@lib/data';
import { Component, OnInit, Input } from '@angular/core';
import { Kid } from '@entities';

@Component({
	selector: 'kid-toolbar',
	template: `
		<p-toolbar class="w-100">
			<div class="w-100 d-flex align-items-center justify-content-between">
				<div>
					<span style="font-size:1.5rem;font-weight:bold;">
						{{ kidFullName }}
					</span>
				</div>

				<div>
					<button
						pButton
						icon="pi pi-briefcase"
						class="mr-1"
						(click)="kidService.showChores()"
					></button>
					<button
						pButton
						icon="pi pi-pencil"
						title="Edit a kid's information"
						class="mr-3"
						[routerLink]="['./edit']"
					></button>
					<button
						pButton
						icon="pi pi-plus"
						(click)="kidService.createTransaction()"
					></button>
				</div>
			</div>
		</p-toolbar>
	`,
	styles: [``]
})
export class KidToolbarComponent implements OnInit {
	_kid: Kid;
	@Input()
	set activeKid(kid) {
		this._kid = kid;
		this.kidFullName = Kid.getKidFullName(kid);
	}
	get activeKid() {
		return this._kid;
	}

	kidFullName: string;

	constructor(public kidService: KidService) {}

	ngOnInit(): void {}
}
