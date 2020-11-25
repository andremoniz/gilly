import { Request, Response } from 'express';

import { readData } from './data/read';
import { DataTransaction } from './data/data-transaction';

export class DataController {
	get = readData;

	async create(req: Request, res: Response) {
		await new DataTransaction(req, res).performTransaction();
	}

	async update(req: Request, res: Response) {
		await new DataTransaction(req, res).performTransaction();
	}

	async delete(req: Request, res: Response) {
		await new DataTransaction(req, res).performTransaction();
	}
}
