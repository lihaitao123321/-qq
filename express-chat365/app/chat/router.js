var router = require('express').Router()
var getMessageHistory=require('./controller/getMessageHistory')
router.post('/getMessageHistory',getMessageHistory)
module.exports = router
