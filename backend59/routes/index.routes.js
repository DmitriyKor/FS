import express from 'express';

import historyRouter from './history.routes.js';
import userRouter from './user.routes.js';
import homeRouter from './home.routes.js';
import categoriesRouter from './categories.routes.js';

const ENDPOINT_HOME = '/';
const ENDPOINT_USER = process.env.ENDPOINT_USER || '/user';
const ENDPOINT_CATEGORIES = process.env.ENDPOINT_CATEGORIES || '/categories';
const ENDPOINT_HISTORY = process.env.ENDPOINT_HISTORY || '/history';

const router = express.Router(); 

router.use(ENDPOINT_HOME, homeRouter);
router.use(ENDPOINT_USER, userRouter);
router.use(ENDPOINT_CATEGORIES, categoriesRouter);
router.use(ENDPOINT_HISTORY, historyRouter);

export default router;