import { Entity, Column } from 'typeorm';

import { BaseModel } from '../base';

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
	money?: number;

	// @Column({ nullable: true })
	// pictures: string;

	// @Column({ nullable: true })
	// transactions: string;
}
