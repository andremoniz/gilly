import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseModel } from '../base';
import { Kid } from '../kid-money/kid';
import { KMTransaction } from '../kid-money/km-transaction';

@Entity()
export class Picture extends BaseModel {
	@Column({ nullable: true })
	location?: string;

	@Column({ nullable: true })
	name: string;

	@Column({ nullable: true })
	extension?: string;

	@Column({ type: 'bytea' })
	data?: string;

	@Column({ nullable: true })
	lastModifiedDate?: Date;

	@Column({ nullable: true })
	size: number;

	// RELATIONSHIPS
	@ManyToOne((type) => Kid, (kid) => kid.pictures)
	kid: Kid;

	@ManyToOne((type) => KMTransaction, (kmTransaction) => kmTransaction.pictures)
	kmTransaction: KMTransaction;

	static async preProcess?(entity, dbConnection) {
		if (entity.name) {
			entity.extension = entity.name.split('.')[1];
		}
	}

	// @Column('bytea', { nullable: false, name: 'Content' })
	// contentHex?: string;

	// private _Content: Buffer | undefined;

	// get Content(): Buffer {
	// 	if (!this._Content) this._Content = new Buffer(this.contentHex, 'hex');
	// 	return this._Content;
	// }
}
