import { AuthService } from '../../services/auth.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'userAuthorized' })
export class UserAuthorizedPipe implements PipeTransform {
	constructor(private auth: AuthService) {}

	transform(roles: string[]) {
		return this.auth.isUserAuthorized(roles);
	}
}
