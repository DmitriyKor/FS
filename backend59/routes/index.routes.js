import express from 'express';

import historyRouter from './history.routes.js';
import userRouter from './user.routes.js';
import categoriesRouter from './categories.routes.js';
import { storeThemeInCookies } from '../cookies/index.js';

const ENDPOINT_USER = process.env.ENDPOINT_USER || '/user';
const ENDPOINT_CATEGORIES = process.env.ENDPOINT_CATEGORIES || '/categories';
const ENDPOINT_HISTORY = process.env.ENDPOINT_HISTORY || '/history';

const router = express.Router(); 

router.use(ENDPOINT_USER, userRouter);
router.use(ENDPOINT_CATEGORIES, categoriesRouter);
router.use(ENDPOINT_HISTORY, historyRouter);
router.post('/set-theme', storeThemeInCookies);


export default router;