import { format } from 'date-fns';
import chalk from 'chalk';

const log = console.log;
console.log = function () {
	const firstParameter = arguments[0];
	const otherParameters = Array.prototype.slice.call(arguments, 1);
	log.apply(console, [`${dateFormat()} ${firstParameter}`.concat(otherParameters)]);
};

const error = console.error;
console.error = function () {
	const firstParameter = arguments[0];
	const otherParameters = Array.prototype.slice.call(arguments, 1);
	error.apply(console, [`${dateFormat()} ${firstParameter}`.concat(otherParameters)]);
};

const dateFormat = () => {
	return `[${chalk.cyan(format(new Date(), `yyyy-MM-dd HH:mm:ss`))}]`;
};
