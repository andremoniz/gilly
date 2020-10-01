import { getRepository } from 'typeorm';

import { AuthRole } from '../../../../../libs/entities/auth/auth-role';
import { User } from '../../../../../libs/entities/auth/user';
import UserController from '../../controllers/userController';

export async function createAdminUser() {
	const adminUser: User = await getRepository(User)
		.createQueryBuilder('user')
		.where('user.username = :username', { username: 'superadmin' })
		.getOne();

	let superadminRole: AuthRole = await getRepository(AuthRole)
		.createQueryBuilder('role')
		.where('role.role = :role', { role: 'Super Admin' })
		.getOne();

	if (!superadminRole) {
		let superadmin = new AuthRole();
		superadmin.role = 'SuperAdmin';
		const roleRepository = getRepository(AuthRole);
		superadminRole = await roleRepository.save(superadmin);
	}

	if (!adminUser) {
		console.log('Creating Admin User...');

		let user = new User();
		user.username = 'superadmin';
		user.password = 'superadmin';
		UserController.hashPassword(user);
		user.email = 'aDm!n@admin.com';
		user.roles = [superadminRole];
		const adminUser = await getRepository(User).save(user);

		console.log('Created Admin User! ', JSON.stringify(adminUser));
	} else {
		if (!adminUser.roles || !adminUser.roles.length) {
			adminUser.roles = [superadminRole];

			console.log(`Updated Super Admin User!`);
		}
	}
}
