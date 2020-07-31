import { checkUserRole } from './checkUserRole';

export const checkModelAllowedRoles = (model: any, userJwt: any) => {
	if (model.allowedRoles && model.allowedRoles.length) {
		return checkUserRole(userJwt, model.allowedRoles);
	} else {
		return true;
	}
};
