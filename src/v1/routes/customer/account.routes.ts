import express from 'express'
import { addAddressInfo, getAccountBio, getAddresses, logout, updateAccountBio, updateAddressInfo } from '../../controllers/customer/account.controller.js';

const router = express.Router();

// retrieve customer account bio
router.get('', getAccountBio);

// update customer account bio
router.patch('', updateAccountBio);

// retrieve customer addresses (address book)
router.get('/addresses', getAddresses);

// add customer address
router.post('/addresses', addAddressInfo);

// update customer address
router.patch('/addresses', updateAddressInfo);

// revoke/delete user access token (user can choose to delete all tokens or just current token)
router.post('/logout', logout);

// update customer account profile image
router.patch('/profile_image', (req, res) => {
    return res.json({
        name: 'chibuzor the king'
    })
});

export default router;