export const capitilizeFirstLetter = (str) => {
	if (!str) return '';
	const transformedStr = str.slice();
	return transformedStr[0].toUpperCase() + transformedStr.slice(1);
};
