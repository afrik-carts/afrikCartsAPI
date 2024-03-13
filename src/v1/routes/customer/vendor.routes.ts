import express from 'express'
import { getMenuById, getVendorById, getVendors } from '../../controllers/customer/vendor.controller.js';

const router = express.Router();

// get vendors including categories and menus
router.get('/:category', getVendors);

// get vendor by id, including categories and menus
router.get('/single/:id', getVendorById);

// get menu by id
router.get('/menu/:id', getMenuById);


export default router;