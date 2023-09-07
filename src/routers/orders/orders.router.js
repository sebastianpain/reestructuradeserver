import { Router } from "express";
import { OrdersController } from "../../controllers/orders.controller.js";

const router = Router();

router.get('/',OrdersController.getOrders);
router.get('/:cid',OrdersController.getOrderById)
router.post('/',OrdersController.createOrder)

export default router