import { KidService } from './../kid.service';
import { DataService } from '@lib/data';
import { Component, OnInit, Input } from '@angular/core';
import { Kid } from '@entities';

@Component({
	selector: 'kid-toolbar',
	template: `
			<p-toolbar class="w-100">
				<div class="w-100 d-flex align-items-center justify-content-between">
					<div class="text-white">
						<span style="font-size:1.5rem;font-weight:bold;">
							{{ getKidFullName(activeKid) }}
						</span>
					</div>

					<div>
						<button
							pButton
							type="button"
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
    @Input() activeKid: Kid;
    
	constructor(public kidService: KidService) {}

	ngOnInit(): void {}

	getKidFullName(kid: Kid) {
		return Kid.getKidFullName(kid);
	}
}
