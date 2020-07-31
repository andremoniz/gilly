// import * as clone from 'rfdc';
// const cloner = clone();
declare var require: any;
const clone = require('rfdc')();

export function deepClone(toCopy: any) {
	if (toCopy instanceof Array) {
		return (toCopy || []).map((o) => clone(o));
	} else {
		return clone(toCopy);
	}
}
