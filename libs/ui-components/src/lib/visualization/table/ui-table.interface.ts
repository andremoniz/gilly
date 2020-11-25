import { UIVisualization } from './../ui-visualization.interface';

export interface UITableColumn {
	prop: string;
	name?: string;
	width?: string;
	type?: string;
	dateStyle?: string;
	styleBackground?: boolean;
}

export interface UITableDisplayOptions extends UIVisualization {
	columns: UITableColumn[];
	defaultPageSize?: number;
	tableSize?: string;
	title?: string;
	showSearch?: boolean;
	showEdit?: boolean;
	showAdd?: boolean;
	showDelete?: boolean;
	hideFilter?: boolean;
	hideSort?: boolean;
	defaultSortProp?: string;
	defaultSortDirection?: 'asc' | 'desc';
}
