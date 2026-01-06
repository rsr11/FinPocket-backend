import express from 'express';
import { transferMoney } from '../controllers/transaction.controller.js';
import { userAuthentication } from '../middlewares/auth.middleware.js';





const route = express.Router();


route.post('/transfer',userAuthentication,transferMoney);




export default route;




