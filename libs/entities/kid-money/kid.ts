import { Column, Entity, OneToMany } from 'typeorm';

import { Picture } from '../_common/picture';
import { BaseModel } from '../base';
import { KMTransaction } from './km-transaction';

@Entity()
export class Kid extends BaseModel {
	@Column({ nullable: true })
	firstName: string;

	@Column({ nullable: true })
	lastName?: string;

	@Column({ nullable: true })
	middleName?: string;

	@Column({ nullable: true })
	fullName?: string;

	@Column({ nullable: true })
	birthday?: Date;

	@Column({ nullable: true })
	gender?: string;

	@Column({ nullable: true })
	notes?: string;

	@Column({ nullable: true })
	money?: number;

	@OneToMany((type) => KMTransaction, (kmTransaction) => kmTransaction.kid)
	transactions?: KMTransaction[];

	@OneToMany((type) => Picture, (picture) => picture.kid)
	pictures?: Picture[];

	static relationships: [
		{ model: KMTransaction; name: 'transactions' },
		{ model: Picture; name: 'pictures' }
	];

	static async preProcess?(entity, dbConnection) {
		if (entity.firstName || entity.middleName || entity.lastName) {
			entity.fullName = Kid.getKidFullName(entity);
		} else if (entity.fullName) {
			const nameSplit = entity.name.split(' ');
			entity.firstName = nameSplit[0];
			if (nameSplit.length > 2) {
				entity.middleName = nameSplit[1];
				for (let i = 2; i < nameSplit.length; i++) {
					entity.lastName += nameSplit[i];
				}
			} else {
				entity.lastName = nameSplit[1];
			}
		}
	}

	static getKidFullName(kid: Kid) {
		return `${kid.firstName || ''}${kid.firstName ? ' ' : ''}${kid.middleName || ''}${
			kid.middleName ? ' ' : ''
		}${kid.lastName || ''}`;
	}
}
