export interface UIVisualization {
	component?: any;
	type?: string;
	name?: string;
	title?: string;
	id?: string;

	rowSpan?: number | string;
	colSpan?: number;
	order?: number;
	showVis?: boolean;
	visible?: boolean;

	displayOptions?: any;
	requiredDisplayProps?: string[];

	dataDrivenColors?: { color?: string; textColor?: string; fieldValue?: any }[];
	dataDrivenColorMap?: {
		[prop: string]: { [value: string]: { color: string; textColor?: string } };
	};

	// FUNCTIONS //
	checkRequiredDisplayProps?: () => boolean;
}
