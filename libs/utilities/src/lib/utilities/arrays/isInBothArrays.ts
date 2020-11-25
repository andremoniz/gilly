export function isInBothArrays(array1, array2, compareProp = 'id') {
	return array1.filter(
		((set) => (a) => set.has(a[compareProp]))(new Set(array2.map((b) => b[compareProp])))
	);
}
