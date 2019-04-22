const express = require('express');
const router = express.Router();

//all routes

router.get('/',(req,res) => {
    res.render('index');
});
module.exports = router;

   