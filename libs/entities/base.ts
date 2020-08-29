import {
	Column,
	Connection,
	CreateDateColumn,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	VersionColumn
} from 'typeorm';

export interface EntityTransaction {
	relationships?: { model: any; name: string; ignoreSubRelations: boolean } | string[];
	loadAfterCreate?: boolean;

	preProcess?: (entity: any, dbConnection: Connection) => void;
	postProcess?: (entity: any, dbConnection: Connection) => void;
}

export interface EntityFieldConfig {
	key: string;
	label?: string;
	type?: string;
	className?: string;
	order?: number;
}

export abstract class BaseModel implements EntityTransaction {
	constructor(props?: any) {
		if (!props) return;

		Object.keys(props).forEach((prop) => {
			const value = props[prop];
			this[prop] = value;
		});
	}

	@PrimaryGeneratedColumn('uuid')
	id?: string;

	@VersionColumn({
		nullable: true
	})
	version?: string;

	@CreateDateColumn()
	createDate?: Date;

	@UpdateDateColumn()
	modifyDate?: Date;

	@Column({
		nullable: true
	})
	createUser?: string;

	@Column({
		nullable: true
	})
	modifyUser?: string;

	// Properties
	static displayName?: string;
	static repoType?: string;

	static fieldConfig?: EntityFieldConfig[];

	static allowedRoles?: string[];

	static relationships?: any[];
	loadAfterCreate?: boolean;

	_tempId?: string;
}
