import chalk from 'chalk';

export const logDataTransaction = (
	method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE',
	entityName: string,
	entity: any[] | any,
	userJwt?: { username: string },
	time?: number,
	query?: any
) => {
	let msg = `${chalk.bold(method)}: ${chalk.yellow(entityName)}`;

	switch (method) {
		case 'GET':
			msg += `${query ? (Object.keys(query).length ? ' ' + JSON.stringify(query) : '') : ''}`;
			msg += ` | Returned ${chalk.underline(entity.length)} entities!`;
			break;
		default:
			msg += ` | ${
				Array.isArray(entity)
					? 'Length: ' + chalk.underline(entity.length)
					: chalk.underline(entity.id)
			}`;
			break;
	}

	msg += ` | ${chalk.bold('USER')}: ${chalk.magenta(userJwt.username)} | ${chalk.bold(
		'TIME'
	)}: ${chalk.grey(time)} ms`;

	console.log(msg);
};

export const logDataTransactionError = (
	error: any,
	method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE',
	entityName: string,
	userJwt?: { username: string },
	time?: number,
	query?: any
) => {
	let msg = `${chalk.bold(method)}: ${chalk.yellow(entityName)}`;
	msg += `${query ? (Object.keys(query).length ? ' ' + JSON.stringify(query) : '') : ''}`;
	msg += ` | ${chalk.bold('USER')}: ${chalk.magenta(userJwt.username)} | ${chalk.bold(
		'TIME'
	)}: ${chalk.grey(time)} ms`;

	console.error(msg);
	console.error(error);
};
