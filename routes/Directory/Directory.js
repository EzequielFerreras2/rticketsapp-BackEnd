const {Router}= require('express');
const router =Router();
const{jwtValidation} = require('../../middlewares/jwt-validator');
const {readEmailsExcelBook} = require('../../Controllers/Directory/Directory')

router.use(jwtValidation);

router.get('/emails',readEmailsExcelBook);
// router.get('/phones',getCasesByUserId);
// router.get('/flotas',getCasesByUserId);



module.exports = router;