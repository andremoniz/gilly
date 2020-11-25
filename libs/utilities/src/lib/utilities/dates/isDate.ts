import isValid from 'date-fns/isValid';

export const isDate = (value: any) => {
	if (!value || value.length < 5) {
		return false;
	}
	const date = new Date(value);
	return isValid(date);
};
