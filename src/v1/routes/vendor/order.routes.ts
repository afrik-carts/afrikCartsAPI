import express from 'express'
import { getAllOrders, getOrder, getOrdersByStatus, updateOrderStatus } from '../../controllers/vendor/order.controller.js';

const router = express.Router();

// get all orders
router.get('', getAllOrders);

// get order by id
router.get('/:id', getOrder);

// get orders by status
router.get('/status/:status', getOrdersByStatus);

// update order status
router.patch('/status', updateOrderStatus);

export default router;