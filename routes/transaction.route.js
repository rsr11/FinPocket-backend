import express from 'express';
import { transferMoney } from '../controllers/transaction.controller.js';
import { userAuthentication } from '../middlewares/auth.middleware.js';
import { transactionValidation } from '../validator/transaction.validator.js';
import { dataValidator } from '../middlewares/validation.middleware.js';





const route = express.Router();


route.post('/transfer', transactionValidation, dataValidator, userAuthentication,transferMoney);




export default route;




