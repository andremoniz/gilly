import { AuthService } from '../../services/auth.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'userUnauthorized' })
export class UserUnauthorizedPipe implements PipeTransform {
	constructor(private auth: AuthService) {}

	transform(roles: string[]) {
		return this.auth.isUserUnauthorized(roles);
	}
}
