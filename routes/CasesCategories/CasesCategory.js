const {Router}= require('express');
const router =Router();
const { check} = require('express-validator')
const { fieldsValidator } = require('../../middlewares/fieldsValidator');
const{jwtValidation} = require('../../middlewares/jwt-validator');
const {getCasesCategory,getCasesCategoryBySubCategory,getCasesCategoryByCategory,
createCasesCategory,updateCasesCategory,deleteCasesCategory,findCasesCategory} = require('../../Controllers/CaseCategories/CasesCategory')

router.use(jwtValidation);

router.get('/',getCasesCategory);

router.get('/bysubcategory/:subcategory',getCasesCategoryBySubCategory);

router.get('/bycategory/:category',getCasesCategoryByCategory);

router.get('/findCasesCategory/:category/:subcategory',findCasesCategory);

router.post('/:category/:subcategory',
[
    check('title','El titulo Es Obligatorio').not().isEmpty(),
    check('subcategory','La Sub-Categoria Es Obligatoria').not().isEmpty(),
    check('priority','La Prooridad Es Obligatoria').not().isEmpty(),
    check('description','La Descripcion Es Obligatoria').not().isEmpty(),
    fieldsValidator
]
,createCasesCategory);

router.put('/:id/:category/:subcategory',
[ 
    check('title','El titulo Es Obligatorio').not().isEmpty(),
    check('subcategory','La Sub-Categoria Es Obligatoria').not().isEmpty(),
    check('priority','La Prooridad Es Obligatoria').not().isEmpty(),
    check('description','La Descripcion Es Obligatoria').not().isEmpty(),
    fieldsValidator
]
,updateCasesCategory);

router.delete('/:id',deleteCasesCategory);


module.exports = router;