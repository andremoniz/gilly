import { User } from '@entities';
import { validate } from 'class-validator';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';

import config from '../config';
import UserController from './userController';

const loginAttempts = 3;

class AuthController {
	static login = async (req: Request, res: Response) => {
		//Check if username and password are set
		let { username, email, password } = req.body;
		if (!((username || email) && password)) {
			res.status(400).send(`You didn't enter a username or password...`);
			console.log(`LOGIN: Username or Password not found; failed to log in!`);
			return;
		}

		//Get user from database
		const userRepository = getRepository(User);
		let user: User;
		try {
			user = await userRepository.findOneOrFail({ where: [{ username }, { email }] });
		} catch (error) {
			res.status(401).send(
				'Account was not found, please check your username / e-mail and try again.'
			);
			console.log(`LOGIN: User ${username} not found; failed to log in!`);
			return;
		}

		if (user.numFailedLogin >= loginAttempts || user.isLocked) {
			const attemptsRemaining = loginAttempts - user.numFailedLogin;
			user.isLocked = user.isLocked || attemptsRemaining <= 0;
			await userRepository.save(user); // increment num failed login counter

			res.status(401).send('Account is locked; please contact an administrator!');
			console.log(`LOGIN: User ${username} has a locked account.`);
			return;
		}

		//Check if encrypted password match
		if (!UserController.checkIfUnencryptedPasswordIsValid(password, user)) {
			user.numFailedLogin++;
			const attemptsRemaining = loginAttempts - user.numFailedLogin;
			user.isLocked = user.isLocked || attemptsRemaining <= 0;
			await userRepository.save(user); // increment num failed login counter

			res.status(401).send(
				`You entered a wrong username, e-mail or password. ${
					attemptsRemaining > 0
						? attemptsRemaining + ' login attempts remaining before account is locked!'
						: 'Account is now LOCKED!'
				} `
			);
			console.log(`LOGIN: User ${user.username} wrong password; failed to log in!`);

			return;
		}

		//Sign JWT, valid for 1 hour
		const token = jwt.sign(
			{
				userId: user.id,
				username: user.username,
				roles: user.roles.map((r) => {
					return { role: r.role };
				})
			},
			config.jwtSecret,
			{
				expiresIn: '1h'
			}
		);

		// Delete user pass
		delete user.password;

		console.log(`LOGIN: User ${user.username} successfully logged in!`);
		user.numSuccessfulLogin++;
		user.numFailedLogin = 0;
		user.lastLoggedInDate = new Date();
		await userRepository.save(user); // increment num successful login counter

		//Send the jwt in the response
		res.send(Object.assign({ jwt: token }, user));
	};

	static changePassword = async (req: Request, res: Response) => {
		//Get ID from JWT
		const id = res.locals.jwtPayload.userId;

		//Get parameters from the body
		const { oldPassword, newPassword } = req.body;
		if (!(oldPassword && newPassword)) {
			res.status(400).send();
		}

		//Get user from the database
		const userRepository = getRepository(User);
		let user: User;
		try {
			user = await userRepository.findOneOrFail(id);
		} catch (id) {
			res.status(401).send();
		}

		//Check if old password matches
		if (!UserController.checkIfUnencryptedPasswordIsValid(oldPassword, user)) {
			res.status(401).send();
			return;
		}

		//Validate the model (password length)
		user.password = newPassword;
		const errors = await validate(user);
		if (errors.length > 0) {
			res.status(400).send(errors);
			return;
		}
		//Hash the new password and save
		UserController.hashPassword(user);
		userRepository.save(user);

		res.status(204).send();
	};
}
export default AuthController;
