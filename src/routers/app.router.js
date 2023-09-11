import { Router } from "express";


import userRouter from './users/users.router.js';
import orderRouter from './orders/orders.router.js';

const router = Router()


router.use('/users',userRouter);
router.get('/orders',orderRouter);



export default router