import { AuthAction } from './auth/auth-action';
import { AuthEntity } from './auth/auth-entity';
import { AuthRole } from './auth/auth-role';
import { AuthRolePermission } from './auth/auth-role-permission';
import { User } from './auth/user';

export const entityMap = {
	// AUTH
	User,
	AuthRole,
	AuthAction,
	AuthEntity,
	AuthRolePermission
};

export { User } from './auth/user';
export { AuthAction } from './auth/auth-action';
export { AuthEntity } from './auth/auth-entity';
export { AuthRole } from './auth/auth-role';
export { AuthRolePermission } from './auth/auth-role-permission';
