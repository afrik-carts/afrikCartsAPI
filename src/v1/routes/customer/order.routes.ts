import express from 'express'
import {
    addItemToCart,
    clearCart,
    getAllOrders,
    getCart,
    getOrder,
    getOrdersByStatus,
    placeOrder,
    removeItemFromCart
} from '../../controllers/customer/order.controller.js';

const router = express.Router();

// get all orders
router.get('', getAllOrders);

// get order by id
router.get('/:id', getOrder);

// get orders by status
router.get('/status/:status', getOrdersByStatus);

// get cart
router.get('/cart/items', getCart);

// add item to cart
router.post('/cart/items', addItemToCart);

// delete item from cart
router.delete('/cart/items', removeItemFromCart);

// clear cart
router.post('/cart/clear', clearCart);

// place order
router.post('/place', placeOrder);

export default router;