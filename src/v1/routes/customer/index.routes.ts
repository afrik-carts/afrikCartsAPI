import express from  'express'
import authRoutes from "./auth.routes.js" 
import accountRoutes from "./account.routes.js" 
import deliveryRoutes from "./delivery.routes.js"
import orderRoutes from "./order.routes.js"
import vendorRoutes from "./vendor.routes.js"
import only_customer from '../../middlewares/only_customer.middleware.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/account', only_customer, accountRoutes);
router.use('/delivery', only_customer, deliveryRoutes);
router.use('/orders', only_customer, orderRoutes);
router.use('/vendors', only_customer, vendorRoutes);

export default router;