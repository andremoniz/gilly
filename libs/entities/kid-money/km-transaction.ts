import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { BaseModel } from '../base';
import { Picture } from './../_common/picture';
import { Kid } from './kid';

@Entity()
export class KMTransaction extends BaseModel {
	static displayName = 'KMTransaction';

	@Column({ nullable: true })
	name?: string;

	@Column({ nullable: true })
	type?: string;

	@Column({ nullable: true })
	income?: number;

	@Column({ nullable: true })
	cost?: number;

	@Column({ nullable: true })
	previousAmount?: number;

	@Column({ nullable: true })
	newAmount?: number;

	@Column({ nullable: true })
	transactionDate?: Date;

	@OneToMany((type) => Picture, (picture) => picture.kmTransaction)
	pictures?: Picture[];

	@ManyToOne((type) => Kid, (kid) => kid.transactions)
	kid?: Kid;

	// OTHER
	static fieldConfig = [
		{ key: 'name', type: 'input' },
		{ key: 'type', type: 'input' },
		{ key: 'income', type: 'input' },
		{ key: 'cost', type: 'input' },
		{ key: 'previousAmount', type: 'input' },
		{ key: 'newAmount', type: 'input' },
		{ key: 'transactionDate', type: 'date' },
		{ key: 'pictures', type: 'array' }
	];
}
