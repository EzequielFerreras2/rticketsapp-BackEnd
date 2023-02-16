const {Router}= require('express');
const router =Router();
const { check} = require('express-validator')
const { fieldsValidator } = require('../../middlewares/fieldsValidator');
const{jwtValidation} = require('../../middlewares/jwt-validator');
const {getCases,getCasesByUserId, createCases, updateUserCases,updateAdminCases,deleteCases} = require('../../Controllers/Cases/Cases')

router.use(jwtValidation);

router.get('/',getCases);
router.get('/:id',getCasesByUserId);

router.post('/:openuser/:casescategory',
[
    // check('casesCategory','La categoria Es Obligatorio').not().isEmpty(),
    // check('openCaseUser','El usuario Creador  Es Obligatorio').not().isEmpty(),
    check('details','El Detalle Es Obligatorio').not().isEmpty(),
    fieldsValidator
]
,createCases);

router.put('/user/:id',
[ 
    check('casesCategory','La categoria Es Obligatorio').not().isEmpty(),
    check('openCaseUser','El usuario Creador  Es Obligatorio').not().isEmpty(),
    check('status','El Status Es Obligatoria').not().isEmpty(),
    fieldsValidator
]
,updateUserCases);

router.put('/admin/:id',
[ 
    check('casesCategory','La categoria Es Obligatorio').not().isEmpty(),
    check('openCaseUser','El usuario Creador  Es Obligatorio').not().isEmpty(),
    check('status','El Status Es Obligatoria').not().isEmpty(),
    check('notesSuport','Las notas son Obligatoria').not().isEmpty(),

    fieldsValidator
]
,updateAdminCases);

router.delete('/:id',deleteCases);


module.exports = router;