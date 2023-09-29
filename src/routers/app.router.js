import {
    Router
} from "express";


import userRouter from './users/users.router.js';
import orderRouter from './orders/orders.router.js';


const router = Router()


router.use('/users', userRouter);
router.get('/orders', orderRouter);
router.get("/", (req, res, next) => {
    try {
        
        let products = generateProduct(100);
        res.status(200).send({
            status: 200,
            response: products.response,
        });
    } catch (error) {
        next(error);
    }
});


export default router