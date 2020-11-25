import { FCDisplayPropertyDataDrivenColor } from '../../../../entities/form-creator/display-properties/fc-display-property.data-driven-color';

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

	dataDrivenColors?: FCDisplayPropertyDataDrivenColor[];
	dataDrivenColorMap?: {
		[prop: string]: { [value: string]: { color: string; textColor?: string } };
	};

	// FUNCTIONS //
	checkRequiredDisplayProps?: () => boolean;
}
