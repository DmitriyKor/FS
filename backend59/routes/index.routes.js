import express from 'express';

import homeRouter from './home.routes';
import categoriesRouter from './categories.routes';
import historysRouter from './history.routes';
import userRouter from './user.routes';

const ENDPOINT_HOME = '/';
const ENDPOINT_USER = process.env.ENDPOINT_USER || '/user';
const ENDPOINT_CATEGORIES = process.env.ENDPOINT_CATEGORIES || '/categories';
const ENDPOINT_HISTORY = process.env.ENDPOINT_HISTORY || '/history';

const router = express.Router(); 

router.use(ENDPOINT_HOME, homeRouter.bind(this));
router.use(ENDPOINT_USER, userRouter.bind(this));
router.use(ENDPOINT_CATEGORIES, categoriesRouter.bind(this));
router.use(ENDPOINT_HISTORY, historysRouter.bind(this));

export default router;