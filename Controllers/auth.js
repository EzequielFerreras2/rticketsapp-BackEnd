const express = require('express');
const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const {generateJWT}= require('../helpers/jwt');

//post
const registerUser = async(req, res = express.response) =>{
 
const {email, password, departament} = req.body
   try {
    let user = await User.findOne({email})
    if (user)
    {
       return res.status(400).json({
            ok:true,
            msg: 'El correo a registrar ya Existe'
        });
    }
    else
    {
     user = new User(req.body)

     // encriptar contraseña
     const salt = bcrypt.genSaltSync();
     user.password= bcrypt.hashSync( password , salt);
     user.status="verifying"
     await user.save();
     const token = await generateJWT(user.id,user.name,user.rol,).then((res)=>{
        return res; 
     })
     res.status(201).json({
        ok:true,
        uid: user.id,
        name:user.name,
        email:user.email,
        rol:user.rol,
        departament:user.departament,
        company:user.company,
        token:token
    });
    }
   } catch (error) {
    console.log(error) 
    res.status(500).json({
        ok:false,
        msg: 'Pongase en contacto con el administrador'
    });
   }
};

const verifyEmail =(req, res = express.response)=>{


};

//post
const login = async(req, res = express.response) =>{

    const { email, password ,departament} = req.body
    let user = await User.findOne({email})
   
    // let pru = await User.find({departament})
    // console.log('departamento')
    // pru.map(res =>{
    //     console.log(res.name)
    // })


    if (!user)
    {
       return res.status(400).json({
            ok:false,
            msg: 'El correo ingresado no existe'
        });
    }

    const passwordVali = bcrypt.compareSync( password, user.password)

    if(! passwordVali){

        return res.status(400).json({
            ok:false,
            msg: 'Contraseña Incorrecta'
        });
    }

    else{

       if(user.status==="verifying"){

        return res.status(400).json({
            ok:false,
            msg: 'Usuario Aun en Verificacion'
        });

       }
       else{

        const token = await generateJWT(user.id,user.name,user.rol).then((res)=>{
            return res;
         })

        res.status(200).json({
            ok:true,
            uid: user.id,
            name:user.name,
            email:user.email,
            rol:user.rol,
            departament:user.departament,
            company:user.company,
            token:token
        });

       }

        
    }
 
    
};

//get
const reNewToken = async(req, res = express.response) =>{

    const {uid,name,rol} = req;

    const token = await generateJWT(uid,name,rol).then((res)=>{
        return res; 
     })

    res.status(200).json({
        ok:true,
        token,
        uid,
        name,
        rol,
        msg:'renew' 
    });
};


module.exports ={ registerUser, login, verifyEmail, reNewToken};