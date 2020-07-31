import { UIChartDisplayOptions } from '../ui-chart.interface';

export interface UIPieChartDisplayOptions extends UIChartDisplayOptions {
    pieChartType?: string;

    isDoughnut?: boolean;

    showLabels?: boolean;
    
    explodeSlices?: boolean;
}
