import { Component, Input, OnInit } from '@angular/core';
import { Kid } from '@entities';

@Component({
	selector: 'kid-overview-card',
	template: `
		<p-card
			[header]="kid.firstName"
			[subheader]="kid.birthday | date: 'mediumDate'"
			styleClass="ui-card-shadow bg-white m-3"
			*ngIf="kid"
		>
			<p-header>
				<!-- <img
					src="Card"
					src="assets/images/daiga-ellaby-JZ51o_-UOY8-unsplash.jpg"
					height="300"
				/> -->
			</p-header>
			<div>
				<h4 class="w-100 border-bottom">Money</h4>
				<h6>{{ kid.money }}</h6>
			</div>
			<p-footer>
				<div class="w-100 d-flex justify-content-end">
					<button
						pButton
						label="View"
						icon="pi-eye"
						class="bg-primary text-white"
					></button>
				</div>
			</p-footer>
		</p-card>
	`,
	styles: [``]
})
export class KidOverviewCardComponent implements OnInit {
	@Input() kid: Kid;

	constructor() {}

	ngOnInit(): void {}
}
