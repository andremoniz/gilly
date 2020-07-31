import { AuthAction } from '../libs/data/src/lib/entities/auth/auth-action';

const commonActions: AuthAction[] = [{ action: 'Run Application' }, { action: 'View Profile' }];
const crudActions: AuthAction[] = [
	{ action: 'Create' },
	{ action: 'Read' },
	{ action: 'Update' },
	{ action: 'Delete' }
];

export const appMeta: IAppMetaConfig = {
	general: {
		name: 'General',
		actions: [...commonActions]
	},

	guessinator: {
		name: 'Guessinator',
		actions: [...commonActions]
	},

	admin: {
		name: 'Admin',
		actions: [...commonActions]
	}
};

interface IAppMetaConfig {
	[appId: string]: IAppMeta;
}

export interface IAppMeta {
	name: string;
	actions: AuthAction[];
}
