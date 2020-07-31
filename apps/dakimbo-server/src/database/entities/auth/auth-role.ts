import { Column, Entity, JoinTable, ManyToMany, OneToMany, Unique } from 'typeorm';

import { BaseModel } from '../base';
import { AuthRolePermission } from './auth-role-permission';
import { User } from './user';

@Entity({
	name: 'auth_role',
	orderBy: {
		role: 'ASC'
	}
})
@Unique(['role'])
export class AuthRole extends BaseModel {
	static displayName = 'AuthRole';

	@Column({ nullable: true })
	role?: string;

	@Column({ nullable: true })
	type?: string;

	@OneToMany((type) => AuthRolePermission, (authRolePermission) => authRolePermission.role)
	authRolePermissions?: AuthRolePermission[];

	@ManyToMany((type) => User, (user) => user.roles, {
		onDelete: 'SET NULL'
	})
	@JoinTable()
	users?: User[];

	static allowedRoles = ['superadmin'];

	// static relationships = [{ model: User, name: 'users', ignoreSubRelations: true }];
}
