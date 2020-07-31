import { Column, Entity } from 'typeorm';

import { BaseModel } from '../base';

@Entity({
	name: '__metric_page_view',
	orderBy: {
		pageName: 'ASC'
	}
})
export class MetricPageView extends BaseModel {
	static displayName = 'MetricPageView';
	
	constructor(props?: MetricPageView) {
		super(props);
	}

	@Column({ nullable: true }) pageName: string;

	@Column({ nullable: true, default: 1 }) viewCount: number;

	@Column({ nullable: true }) appName: string;
}
