import { Entity, Column } from 'typeorm';

@Entity()
export class Location {
	@Column({ nullable: true, type: 'float8' })
	latitude: number;

	@Column({ nullable: true, type: 'float8' })
	longitude: number;

	@Column({ nullable: true })
	mgrs: string;
}
