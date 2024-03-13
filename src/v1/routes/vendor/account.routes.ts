import express from 'express'
import { getAccountBio, getContactInfo, logout, updateAccountBio, updateContactInfo } from '../../controllers/vendor/account.controller.js';

const router = express.Router();

// retrieve logistic account bio
router.get('', getAccountBio);

// update logistic account bio
router.patch('', updateAccountBio);

// retrieve logistic account bio
router.get('/contact_info', getContactInfo);

// update logistic account primary contact info
router.patch('/contact_info', updateContactInfo);

// revoke/delete user access token (user can choose to delete all tokens or just current token)
router.post('/logout', logout);

// update logistic account profile image
router.patch('/profile_image', (req, res) => {
    return res.json({
        name: 'chibuzor the king'
    })
});

export default router;