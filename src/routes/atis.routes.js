import { generateReport } from '../controllers/atis.controller.js';
import { Router } from 'express';

const atisRouter = Router();

atisRouter.post('/atis/report', generateReport);

export { atisRouter };