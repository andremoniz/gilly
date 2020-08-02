import { Component } from '@angular/core';
import { Kid } from '@entities';
import { DataService } from '@lib/data';
import { AuthService } from '@lib/app-shell';

@Component({
	selector: 'gilly-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	mockKids = [
		{
			id: '1',
			firstName: 'John',
			lastName: 'Smith Jr.',
			birthday: new Date('04/02/2009'),
			gender: 'M',
			money: 30.5
		},
		{
			id: '2',
			firstName: 'Julien',
			lastName: 'Smith',
			birthday: new Date('04/02/2009'),
			gender: 'M',
			money: 10
		},
		{
			id: '3',
			firstName: 'Kayla',
			lastName: 'Smith',
			birthday: new Date('04/02/2009'),
			gender: 'F',
			money: 459,
			transactions: [
				{
					id: 1,
					name: 'Bulldozer Toy',
					type: 'Toy',
					cost: 10,
					createDate: new Date()
				},
				{
					id: 2,
					name: 'Broke the door handle',
					type: 'Destruction',
					cost: 100
				},
				{
					id: 3,
					name: 'Talk back to Mom',
					type: 'Disrespect',
					cost: 20
				},
				{
					id: 4,
					name: 'Hotwheels Cars',
					type: 'Toy',
					cost: 5
				},
				{
					id: 5,
					name: 'Skittles',
					type: 'Candy',
					cost: 1
				}
			]
		}
	];

	constructor(private dataService: DataService, public auth: AuthService) {}

	ngOnInit() {
		this.auth.userLoggedIn$.subscribe((loggedIn) => {
			this.dataService.setData(Kid, this.mockKids);
		});
	}
}
