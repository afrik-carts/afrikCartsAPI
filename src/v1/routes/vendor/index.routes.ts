import express from  'express'
import authRoutes from "./auth.routes.js" 
import accountRoutes from "./account.routes.js" 
import orderRoutes from "./order.routes.js" 
import mwnuRoutes from "./menu.routes.js" 
import only_vendor from '../../middlewares/only_vendor.middleware.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/account', only_vendor, accountRoutes);
router.use('/orders', only_vendor, orderRoutes);
router.use('/menu', only_vendor, mwnuRoutes);

export default router;