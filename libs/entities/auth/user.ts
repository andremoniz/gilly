import { Column, Entity, ManyToMany, Unique } from 'typeorm';

import { BaseModel } from '../base';
import { AuthRole } from './auth-role';

@Entity({
	name: 'auth_user',
	orderBy: {
		username: 'ASC'
	}
})
@Unique(['username'])
export class User extends BaseModel {
	static displayName = 'User';

	constructor(props?: User) {
		super(props);
	}

	@Column()
	username?: string;

	@Column()
	password?: string;

	@Column({
		nullable: true,

		length: 255
	})
	email?: string;

	@Column({
		nullable: true,
		default: 0
	})
	numSuccessfulLogin?: number;

	@Column({
		nullable: true,
		default: 0
	})
	numFailedLogin?: number;

	@Column({ nullable: true })
	lastLoggedInDate?: Date;

	@Column({ default: false })
	isLocked?: boolean;

	@ManyToMany((type) => AuthRole, (role) => role.users, { eager: true, cascade: true })
	roles?: AuthRole[];

	jwt?: string;
	expiry?: Date;

	static relationships = [{ model: AuthRole }];
}
