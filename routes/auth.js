/*
    Rutas de usuarios 
    host + /api/auth
 */
const {Router}= require('express');
const router =Router();
const { check} = require('express-validator')
const { registerUser, login, verifyEmail ,reNewToken } = require('../Controllers/auth');
const { fieldsValidator } = require('../middlewares/fieldsValidator');
const {jwtValidation} = require('../middlewares/jwt-validator')


//rutas rutas
router.post(
'/register',
[
    //middlewares
    check('name','El Nombre Es Obligatorio').not().isEmpty(),
    check('email','El email Es Obligatorio').isEmail(),
    check('password','La contraseña debe tener al menos entre 6-32 caracteres').isLength({min:8, max:32}),
    check('rol','El Rol Es Obligatorio').not().isEmpty(),
    check('company','La Compañia es obligatoria').not().isEmpty(),
    fieldsValidator
] ,
registerUser);

router.post(
    '/register/verification',verifyEmail);

router.post(
'/login',
[
    check('email','El email Es Obligatorio').isEmail(),
    check('password','La contraseña debe tener al menos entre 6-32 caracteres').isLength({min:8, max:32}),
    fieldsValidator
], 
login);

router.get(
'/renew',
[jwtValidation], 
reNewToken);


module.exports = router;