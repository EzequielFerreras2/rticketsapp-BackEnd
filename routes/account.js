const {Router}= require('express');
const router =Router();
const { check} = require('express-validator')
const { fieldsValidator } = require('../middlewares/fieldsValidator');
const{jwtValidation} = require('../middlewares/jwt-validator');
const {getAccount,updateAccount,deleteAccount,changePassword,getAccountbyId} = require('../Controllers/account')

router.use(jwtValidation)

router.get('/',getAccount)

router.get('/:id',getAccountbyId)

router.put('/updateacoount/:id',
[ 
    check('name','El Nombre Es Obligatorio').not().isEmpty(),
    check('email','El email Es Obligatorio').isEmail(),
    check('rol','El Rol Es Obligatorio').not().isEmpty(),
    check('company','La Compañia es obligatoria').not().isEmpty(),
    fieldsValidator
]
,updateAccount)

router.put('/changepassword/:id',
[ 
    check('name','El Nombre Es Obligatorio').not().isEmpty(),
    check('email','El email Es Obligatorio').isEmail(),
    check('rol','El Rol Es Obligatorio').not().isEmpty(),
    check('password','La contraseña debe tener al menos entre 6-32 caracteres').isLength({min:8, max:32}),
    check('company','La Compañia es obligatoria').not().isEmpty(),
    fieldsValidator
]
,changePassword)

router.delete('/:id',deleteAccount);


module.exports = router;