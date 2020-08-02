import { MetricPageView } from './_metrics/metric-page-view';
import { MetricPageVisit } from './_metrics/metric-page-visit';
import { AuthAction } from './auth/auth-action';
import { AuthEntity } from './auth/auth-entity';
import { AuthRole } from './auth/auth-role';
import { AuthRolePermission } from './auth/auth-role-permission';
import { User } from './auth/user';
import { Kid } from './kid-money/kid';

export const entityMap = {
	// AUTH
	User,
	AuthRole,
	AuthAction,
	AuthEntity,
	AuthRolePermission,

	// METRICS
	MetricPageView,
	MetricPageVisit,

	// KID MONEY
	Kid
};

export { User } from './auth/user';
export { AuthAction } from './auth/auth-action';
export { AuthEntity } from './auth/auth-entity';
export { AuthRole } from './auth/auth-role';
export { AuthRolePermission } from './auth/auth-role-permission';
export { MetricPageView } from './_metrics/metric-page-view';
export { MetricPageVisit } from './_metrics/metric-page-visit';
export { Kid } from './kid-money/kid';
