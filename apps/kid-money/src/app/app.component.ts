import { Component } from '@angular/core';
import { Kid } from '@entities';
import { AuthService } from '@lib/app-shell';
import { DataService } from '@lib/data';
import { take } from 'rxjs/operators';

@Component({
	selector: 'gilly-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	constructor(private dataService: DataService, public auth: AuthService) {}

	ngOnInit() {
		this.auth.userLoggedIn$.subscribe((loggedIn) => {
			this.dataService.read(Kid).pipe(take(1)).subscribe();
		});
	}
}
