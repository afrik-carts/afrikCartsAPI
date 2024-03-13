import express from  'express'

const router = express.Router();

router.use('/', (req, res) => {
    res.json("hello")
});

export default router;