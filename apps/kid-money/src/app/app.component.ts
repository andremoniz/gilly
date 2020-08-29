import { Component } from '@angular/core';
import { take } from 'rxjs/operators';

import { AuthService } from './../../../../libs/app-shell/src/lib/services/auth.service';
import { DataService } from './../../../../libs/data/src/lib/services/data/data.service';
import { Kid } from './../../../../libs/entities/kid-money/kid';

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
