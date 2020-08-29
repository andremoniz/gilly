export const transformObjectToArray = (obj: any) => {
	const objArray = [];
	Object.keys(obj).forEach((key) => {
		objArray.push({
			prop: key,
			value: obj[key]
		});
	});
	return objArray;
};
