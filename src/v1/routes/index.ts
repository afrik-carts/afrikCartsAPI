import express from  'express'
import adminRoutes from "./admin/index.routes.js" 
import customerRoutes from "./customer/index.routes.js" 
import vendorRoutes from "./vendor/index.routes.js" 

const router = express.Router();

router.use('/customer', customerRoutes);
router.use('/vendor', vendorRoutes);
router.use('/admin', adminRoutes);

export default router;