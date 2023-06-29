var express = require('express');
var router = express.Router();
const empController=require("../controller/emp_api")
const middleWare=require("../middleware/middleware.js")
const prodController=require('../controller/prod_api')
const emailSend=require('../controller/email_send')

router.get('/emp_get',middleWare,empController.getfun)
router.get('/emp_gets',empController.getfuns)
router.get('/emp_getemp/:_id',empController.getfunid)
router.post('/emp_post',empController.postfun)
router.post('/emp_sign',empController.Sign_in)
router.put('/emp_put/:_id',empController.putfun)
router.delete('/emp_delete/:_id',empController.deletefun)
router.post('/generate_otp/:email',emailSend.sendMail)
router.post('/verify_otp',emailSend.verifyMail)
router.put('/update_pass/:email',emailSend.updatePass)

router.get('/getproducts',prodController.getproduct)
router.get('/getproduct/:_id',prodController.getProductById)
router.post('/postproduct',prodController.postproduct)
router.put('/putproduct/:_id',prodController.putproduct)
router.delete('/deleteproduct/:_id',prodController.deleteproduct)




module.exports = router;
