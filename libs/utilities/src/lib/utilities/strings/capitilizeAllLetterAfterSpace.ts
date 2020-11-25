export const capitilizeAllLetterAfterSpace = (str) => {
	if (!str) return str;
	return str
		.split(' ')
		.map((s) => s.charAt(0).toUpperCase() + s.substring(1, s.length))
		.join(' ');
};
