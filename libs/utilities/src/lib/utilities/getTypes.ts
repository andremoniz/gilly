export const getValueType = (value) => {
	if (!value) return null;

	let type = 'string';
	switch (typeof value) {
		case 'number':
			type = 'number';
			break;
		case 'string':
			if (this.isDate(value)) type = 'date';
			else type = 'string';
			break;
		case 'object':
			if (this.isDate(value)) type = 'date';
			else if (value instanceof Array) type = 'array';
			else type = 'object';
			break;
		default:
			type = 'string';
			break;
	}
	return type;
};

export const getPropertyTypes = (obj: any, ignoreProps: string[] = []) => {
	const propTypeMap = {};
	Object.keys(obj).forEach((key) => {
		if (ignoreProps.find((p) => p === key)) return;
		propTypeMap[key] = getValueType(obj[key]);
	});
	return propTypeMap;
};

export const getPropertyTypesForArray = (arr: any[] = [], ignoreProps: string[] = []) => {
	const propTypeMap = {};

	(arr || []).forEach((d) => {
		const oTypeMap = getPropertyTypes(d, ignoreProps);
		Object.assign(propTypeMap, oTypeMap);
	});

	return propTypeMap;
};
