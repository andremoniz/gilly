import { Column, Entity, OneToMany } from 'typeorm';

import { BaseModel } from '../base';
import { AuthRolePermission } from './auth-role-permission';

@Entity({
	name: 'auth_entity',
	orderBy: {
		action: 'ASC'
	}
})
export class AuthEntity extends BaseModel {
	static displayName = 'AuthAction';

	@Column({ nullable: true })
	entity?: string;

	@Column({ nullable: true })
	type?: string;

	@Column({ nullable: true })
	application?: string;

	@OneToMany((type) => AuthRolePermission, (authRolePermission) => authRolePermission.entity)
	authRolePermissions?: AuthRolePermission[];

	static allowedRoles = ['superadmin'];
}
