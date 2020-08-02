import { Component, OnInit } from '@angular/core';
import { Kid } from '@entities';

@Component({
	selector: 'km-home',
	template: `
		<lib-page-container>
			<ng-template #header>
				<!-- <h2 class="ml-3">Kids</h2> -->
			</ng-template>
			<ng-template #main>
				<kid-overview-card [kid]="kid" *ngFor="let kid of kids"></kid-overview-card>
			</ng-template>
		</lib-page-container>
	`,
	styles: [``]
})
export class KMHomeComponent implements OnInit {
	kids: Kid[] = [
		{
			firstName: 'John',
			lastName: 'Smith',
			birthday: new Date('04/02/2009'),
			gender: 'M',
			money: 30.5
		},
		{
			firstName: 'Julien',
			lastName: 'Smith',
			birthday: new Date('04/02/2009'),
			gender: 'M',
			money: 10
		},
		{
			firstName: 'Kayla',
			lastName: 'Smith',
			birthday: new Date('04/02/2009'),
			gender: 'F',
			money: 459
		}
	];

	constructor() {}

	ngOnInit(): void {}
}
