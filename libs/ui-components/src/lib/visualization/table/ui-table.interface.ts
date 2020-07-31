export interface UITableColumn {
	prop: string;
	name?: string;
	width?: string;
	type?: string;
	dateStyle?: string;
	styleBackground?: boolean;
}

export interface UITableDisplayOptions {
	columns: UITableColumn[];
	defaultPageSize?: number;
	tableSize?: string;
	title?: string;
	showAdd?: boolean;
	showDelete?: boolean;
	hideFilter?: boolean;
	hideSort?: boolean;
}
