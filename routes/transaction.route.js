import express from 'express';
import { categoryListing, transactionSummary, transferMoney } from '../controllers/transaction.controller.js';
import { userAuthentication } from '../middlewares/auth.middleware.js';
import { transactionValidation } from '../validator/transaction.validator.js';
import { dataValidator } from '../middlewares/validation.middleware.js';





const route = express.Router();


route.get('/categoryListing', categoryListing);

route.post('/transfer', transactionValidation, dataValidator, userAuthentication,transferMoney);

route.get(`/analyticSummary`, userAuthentication, transactionSummary );



export default route;




