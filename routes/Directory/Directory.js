const {Router}= require('express');
const router =Router();
const{jwtValidation} = require('../../middlewares/jwt-validator');
const {readEmailsExcelBook,readflotasExcelBook,readPhonesExcelBook} = require('../../Controllers/Directory/Directory')

router.use(jwtValidation);

router.get('/emails',readEmailsExcelBook);
router.get('/phones',readPhonesExcelBook);
router.get('/flotas',readflotasExcelBook);



module.exports = router;