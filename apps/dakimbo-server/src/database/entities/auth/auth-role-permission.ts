import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseModel } from '../base';
import { AuthAction } from './auth-action';
import { AuthEntity } from './auth-entity';
import { AuthRole } from './auth-role';

@Entity({
	name: 'auth_role_permission'
})
export class AuthRolePermission extends BaseModel {
	static displayName = 'AuthRoleAction';

	@Column({ nullable: true, default: false })
	allowed: boolean;

	@Column({ nullable: true, default: false })
	canCreate?: boolean;

	@Column({ nullable: true, default: false })
	canRead?: boolean;

	@Column({ nullable: true, default: false })
	canUpdate?: boolean;

	@Column({ nullable: true, default: false })
	canDelete?: boolean;

	@ManyToOne((type) => AuthAction, (authAction) => authAction.authRolePermissions)
	action?: AuthAction;

	@ManyToOne((type) => AuthEntity, (authEntity) => authEntity.authRolePermissions)
	entity?: AuthEntity;

	@ManyToOne((type) => AuthRole, (authRole) => authRole.authRolePermissions)
	role?: AuthRole;

	static allowedRoles = ['superadmin'];
}
