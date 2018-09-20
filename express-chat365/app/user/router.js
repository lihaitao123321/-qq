var router = require('express').Router()
var login=require('./controller/login')
var register=require('./controller/register')
router.post('/login',login)
router.post('/register',register)
module.exports = router
