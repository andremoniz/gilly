import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { BaseModel } from '../base';
import { Picture } from './../_common/picture';
import { EntityFieldConfig } from './../base';
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
	static fieldConfig: EntityFieldConfig[] = [
		{ key: 'name', label: 'Transaction Name', type: 'input' },
		{ key: 'transactionDate', label: 'Date of Transaction', type: 'date' },
		{ key: 'cost', label: 'Cost', type: 'input' },
		{ key: 'income', label: 'Income', type: 'input' },
		{ key: 'type', label: 'Type', type: 'input' }
		// { key: 'pictures', type: 'array' }
	];
}
