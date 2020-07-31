import { Request, Response } from 'express';

import { readData } from './data/read';
import { DataTransaction } from './data/data-transaction';

class DataController {
	static get = readData;

	static create = async (req: Request, res: Response) => {
		await new DataTransaction(req, res).performTransaction();
	};

	static update = async (req: Request, res: Response) => {
		await new DataTransaction(req, res).performTransaction();
	};

	static delete = async (req: Request, res: Response) => {
		await new DataTransaction(req, res).performTransaction();
	};
}
export default DataController;
