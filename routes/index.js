const router = require('express').Router()
const {ensureAuthenticated} = require('../config/auth')
//Welcome page
router.get('/',(req, res) =>{
    res.render('welcome')
})

//Dashboard page
router.get('/dashboard',ensureAuthenticated, (req, res)=>{
    res.render('dashboard',{
        name: req.user.name     //to display name (in dashboard)
    })
})

module.exports = router