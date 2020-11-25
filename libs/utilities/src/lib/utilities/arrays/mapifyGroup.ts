export function mapifyGroup(values: any[], prop: string): { [prop: string]: any[] } {
	const mapified = {};
	(values && values.length ? values : []).forEach((v) => {
		let value;
		if (prop.indexOf('.') >= 0) {
			const subProps = prop.split('.');
			value = v[subProps[0]][subProps[1]];
		} else {
			value = v[prop];
		}

		if (mapified[value]) {
			mapified[value].push(v);
		} else {
			mapified[value] = [v];
		}
	});

	return mapified;
}
