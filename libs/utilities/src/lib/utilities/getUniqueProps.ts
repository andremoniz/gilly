export function getUniqueProps(data: any[]): string[] {
	let uniqueMap = {};
	data.forEach((d) => {
		Object.keys(d).forEach((k) => {
			uniqueMap[k] = true;
		});
	});
	let uniqueProps: string[] = [];
	Object.keys(uniqueMap).forEach((p) => uniqueProps.push(p));
	uniqueProps.sort();
	return uniqueProps;
}
