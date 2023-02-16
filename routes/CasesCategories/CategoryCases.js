const {Router}= require('express');
const router =Router();
const { check} = require('express-validator')
const { fieldsValidator } = require('../../middlewares/fieldsValidator');
const{jwtValidation} = require('../../middlewares/jwt-validator');
const {getCategory,createCategory,updateCategory,deleteCategory} = require('../../Controllers/CaseCategories/CategoryCases')

router.use(jwtValidation)

router.get('/',getCategory)

router.post('/',
[
    check('category','La Categoria Es Obligatoria').not().isEmpty(),
    fieldsValidator
]
,createCategory);

router.put('/:id',
[ 
    check('category','La Categoria Es Obligatoria').not().isEmpty(),
    fieldsValidator
]
,updateCategory)

router.delete('/:id',deleteCategory);


module.exports = router;