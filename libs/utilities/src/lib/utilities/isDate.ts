import parseISO from 'date-fns/parseISO';

export const isDate = (value: any) => {
	const parsed = <any>parseISO(value);
	return parsed.toString() !== 'Invalid Date';
};
