export interface UIVisualization {
	component: any;
	type?: string;
	name?: string;
	title?: string;
	id?: string;

	rowSpan?: number;
	colSpan?: number;
	order?: number;
	showVis?: boolean;
	visible?: boolean;

	displayOptions?: any;
	requiredDisplayProps?: string[];

	// FUNCTIONS //
	checkRequiredDisplayProps?: () => boolean;
}
