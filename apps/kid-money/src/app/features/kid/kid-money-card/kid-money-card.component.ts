import { Component, Input, OnInit } from '@angular/core';
import { Kid } from '@entities';

@Component({
	selector: 'kid-money-card',
	template: `
		<p-card [header]="'Money'" styleClass="bg-white">
			<div class="w-100 border-top">
				<h4>
					{{ activeKid.money }}
				</h4>
			</div>
		</p-card>
	`,
	styles: [``]
})
export class KidMoneyCardComponent implements OnInit {
	@Input() activeKid: Kid;

	constructor() {}

	ngOnInit(): void {}
}
