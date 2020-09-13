import { capitalizeFirstLetter } from './capitalizeFirstLetter';

export const prettyPrint = (str) => {
	if (!str) return '';
	const prettyStr = str
		.match(/([A-Z]?[^A-Z]*)/g)
		.slice(0, -1)
		.join(' ');
	return capitalizeFirstLetter(prettyStr);
};
