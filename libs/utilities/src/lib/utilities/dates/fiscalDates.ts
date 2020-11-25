import { isDate } from './isDate';

export interface FiscalDates {
	fiscalYear: number;
	fiscalQuarter: number;
}

export function getFiscalDates(date: string | Date): FiscalDates {
	if (!isDate(date)) {
		return null;
	}
	const dateCheck = new Date(date);
	const dateMonth = dateCheck.getMonth() + 1;
	let fiscalYear, fiscalQuarter;

	if (dateMonth >= 10) {
		fiscalYear = dateCheck.getFullYear() + 1;
	} else {
		fiscalYear = dateCheck.getFullYear();
	}

	if (dateMonth >= 10 && dateMonth <= 12) {
		fiscalQuarter = 1;
	} else if (dateMonth >= 1 && dateMonth <= 3) {
		fiscalQuarter = 2;
	} else if (dateMonth >= 4 && dateMonth <= 6) {
		fiscalQuarter = 3;
	} else if (dateMonth >= 7 && dateMonth < 10) {
		fiscalQuarter = 4;
	}

	return {
		fiscalYear,
		fiscalQuarter
	};
}
