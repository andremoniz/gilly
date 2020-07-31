import { Column, Entity } from 'typeorm';

import { BaseModel } from '../base';
import { Database } from './../../../../../../apps/dakimbo-server/src/database/database';
import { EntityTransaction } from './../base';

@Entity({
	name: '__metric_page_visit',
	orderBy: {
		createDate: 'DESC'
	}
})
export class MetricPageVisit extends BaseModel implements EntityTransaction {
	static displayName = 'MetricPageVisit';

	constructor(props?: MetricPageVisit) {
		super(props);
	}

	@Column({ nullable: true }) pageName: string;

	@Column({ nullable: true }) appName: string;

	static async preProcess(entity) {
		// Check if there is already an entry for this metric in the DB for views;
		// if there is, then increment the page count, otherwise start a new one
		const repo = Database._connection.getRepository('MetricPageView');
		const existingPageViewMetric: any = await repo.findOne({
			where: { appName: entity.appName, pageName: entity.pageName }
		});
		if (!existingPageViewMetric) {
			await repo.save({
				pageName: entity.pageName,
				appName: entity.appName,
				viewCount: 1
			});
		} else {
			existingPageViewMetric.viewCount++;
			await repo.save(existingPageViewMetric);
		}
	}
}
