const {Router}= require('express');
const router =Router();
const { check} = require('express-validator')
const { fieldsValidator } = require('../../middlewares/fieldsValidator');
const{jwtValidation} = require('../../middlewares/jwt-validator');
const {getSubCategory,getSubCategoryByCategory,createSubCategory,updateSubCategory,deleteSubCategory} = require('../../Controllers/CaseCategories/SubCategory')

router.use(jwtValidation)

//SubCategoria
router.get('/',getSubCategory)

//SubCategoria by Category
router.get('/bycategory/:category',getSubCategoryByCategory);

//Create SubCategoria
router.post('/:category',
[
    check('category','La Categoria Es Obligatoria').not().isEmpty(),
    check('subcategory','La Sub-Categoria Es Obligatoria').not().isEmpty(),
    fieldsValidator
]
,createSubCategory);

//Update SubCategoria
router.put('/:id/:category',
[ 
    check('category','La Categoria Es Obligatoria').not().isEmpty(),
    check('subcategory','La Sub-Categoria Es Obligatoria').not().isEmpty(),
    fieldsValidator
]
,updateSubCategory)

//Delete SubCategoria
router.delete('/:id',deleteSubCategory);


module.exports = router;