export const getUniqueValues = (array: any[], prop: string): any[] => {
	return Array.from(new Set(array.map((item) => item[prop]))).sort();
};
