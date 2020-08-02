import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { BaseModel } from '../base';
import { Picture } from './../_common/picture';
import { Kid } from './kid';

@Entity()
export class KMTransaction extends BaseModel {
	@Column({ nullable: true })
	name?: string;

	@Column({ nullable: true })
	type?: string;

	@Column({ nullable: true })
	income?: number;

	@Column({ nullable: true })
	cost?: number;

	@Column({ nullable: true })
	previousAmount: number;

	@Column({ nullable: true })
	newAmount: number;

	@OneToMany((type) => Picture, (picture) => picture.kmTransaction)
	pictures?: Picture[];

	@ManyToOne((type) => Kid, (kid) => kid.transactions)
	kid: Kid;
}
