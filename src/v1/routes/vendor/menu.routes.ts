import express from 'express'
import {
    addMenu,
    addMenuCategory,
    deleteMenu,
    deleteMenuCategory,
    getMenuCategories,
    getMenus,
    getMenusByCategoryId,
    updateMenu,
    updateMenuCategory
} from '../../controllers/vendor/menu.controller.js';

const router = express.Router();

// get all menus
router.get('', getMenus);

// get menus menus by category id
router.get('/categories/:category_id', getMenusByCategoryId);

// get all menus categories, menu included
router.get('/categories', getMenuCategories);

// add menu category
router.post('/categories', addMenuCategory);

// update menu category
router.patch('/categories', updateMenuCategory);

// delete menu ctegory
router.delete('/categories/:menu_category_id', deleteMenuCategory);

// add menu
router.post('', addMenu);

// update menu
router.patch('', updateMenu);

// delete menu
router.delete('/:menu_id', deleteMenu);



export default router;