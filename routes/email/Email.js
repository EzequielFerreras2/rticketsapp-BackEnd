const {Router}= require('express');
const router =Router();
const { check} = require('express-validator')
const { fieldsValidator } = require('../../middlewares/fieldsValidator');
const{jwtValidation} = require('../../middlewares/jwt-validator')
const {sendCloseCasesEmail,sendCreateCasesEmail} = require('../../Controllers/Email/Email')

router.use(jwtValidation)

router.post('/createcasesemail',sendCreateCasesEmail);

router.post('/closecasesemail',sendCloseCasesEmail);


module.exports = router;