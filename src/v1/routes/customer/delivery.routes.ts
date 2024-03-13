import express from  'express'

const router = express.Router();

// retrieve all customer deliveries
router.get('', (req, res) => {
    return res.json({
        message: 'delivery route'
    })
})
// retrieve customer deliveries by status (pending, cancelled, completed)
router.get('/:status', (req, res) => {
    return res.json({
        message: req.params.status + ' delivery route'
    })
})
// create a delivery request
router.post('', (req, res) => {
    return res.json({
        message: 'delivery route'
    })
})
// cancel customer delivery (note: all recipient's delivery under this delivery must be pending)
router.patch('/cancel', (req, res) => {
    return res.json({
        message: 'dcancel delivery'
    })
})
// request for a rider
router.post('/request_ride', (req, res) => {
    return res.json({
        message: 'delivery route'
    })
})

export default router;