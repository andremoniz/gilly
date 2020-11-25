import { isDate } from './dates/isDate';

export const getValueType = (value) => {
	if (!value) return null;

	let type = 'string';
	switch (typeof value) {
		case 'number':
			type = 'number';
			break;
		case 'string':
			if (isDate(value)) type = 'date';
			else type = 'string';
			break;
		case 'object':
			if (isDate(value)) type = 'date';
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
	const objectTypes = [];
	const typePriority = ['date'];

	(arr || []).forEach((d) => {
		objectTypes.push(getPropertyTypes(d, ignoreProps));
	});

	const propTypeCountMap = objectTypes.reduce((propMap, objectType) => {
		Object.keys(objectType).forEach((p) => {
			if (!propMap[p]) {
				propMap[p] = {
					[objectType[p]]: 1
				};
				return;
			}

			if (propMap[p][objectType[p]]) {
				propMap[p][objectType[p]]++;
			} else {
				propMap[p][objectType[p]] = 1;
			}

			// if (typePriority.includes(propMap[p])) {
			// 	return;
			// } else {
			// 	propMap[p] = objectType[p];
			// }
		});
		return propMap;
	}, {});

	const propTypeMap = {};
	Object.keys(propTypeCountMap).forEach((oProp) => {
		let foundMax = 0,
			foundMaxType = 'string';
		Object.keys(propTypeCountMap[oProp]).forEach((p) => {
			const pCount = propTypeCountMap[oProp][p];
			if (pCount > foundMax) {
				foundMax = pCount;
				foundMaxType = p;
			}
		});
		propTypeMap[oProp] = foundMaxType;
	});

	return propTypeMap;
};
