import { Column, Entity, OneToMany, Tree, TreeChildren, TreeParent } from 'typeorm';

import { BaseModel } from '../base';
import { AuthRolePermission } from './auth-role-permission';

@Entity({
	name: 'auth_action',
	orderBy: {
		action: 'ASC'
	}
})
@Tree('nested-set')
export class AuthAction extends BaseModel {
	static displayName = 'AuthAction';
	static repoType = 'tree';

	@Column({ nullable: true })
	action?: string;

	@Column({ nullable: true })
	type?: string;

	@Column({ nullable: true })
	application?: string;

	@Column({ nullable: true, default: false })
	isFolder?: boolean;

	@OneToMany((type) => AuthRolePermission, (authRolePermission) => authRolePermission.action)
	authRolePermissions?: AuthRolePermission[];

	@TreeChildren()
	children?: AuthAction[];

	@TreeParent()
	parent?: AuthAction;

	static allowedRoles = ['superadmin'];
}
