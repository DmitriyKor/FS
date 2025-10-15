import { validationResult } from 'express-validator';
import { GeneralServerError } from '../exceptions/GeneralErrors.js';

export const validationHandler = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        next(new GeneralServerError(400, 'Validation errors : '+errors.array()))
    }
    else {
        next();
    }
}