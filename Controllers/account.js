const express = require('express');
const Account = require('../models/UserModel')
const bcrypt = require('bcryptjs')
const {verify} = require('jsonwebtoken')

const getAccount =async(req, res = express.response)=>{

    const account = await Account.find();
    return res.status(200).json({
        ok:true,
        Account: account
    });

};

const getAccountbyId =async(req, res = express.response)=>{

    const accountId = req.params.id
    const account = await Account.findById(accountId);
    return res.status(200).json({
        ok:true,
        Account:{
            id: account.id,
            name: account.name,
            email: account.email,
            company: account.company,
            departament: account.departament,

        }
    });

};

const updateAccount =async(req, res = express.response)=>{

const token = req.header('x-token')

    if(!token){
        return res.status(401).json({
            ok:false,
            msg:'No hay token en la peticion'
        });
    }

    const {rol}= verify(token,process.env.SECRET_JWT_SEED);

    const accountId = req.params.id
   
    try 
    {
        if(rol !=="Admin")
        {
            return res.status(400).json({
                ok:false,
                msg: 'Solo el administrador puede Actualizar Las Cuentas'
            });
        }
        else
        {
            const account = await Account.findById(accountId)
            if(!account){
                return res.status(400).json({
                    ok:false,
                    msg: 'La cuenta  no existe'
                });
            }
            else
            {
                
                const newAccount ={...req.body};
                // const { password} = req.body;
                // const salt = bcrypt.genSaltSync();
                // newAccount.password= bcrypt.hashSync( password , salt);

                const updatedNewAcount = await Account.findByIdAndUpdate(accountId,newAccount,{new:true});

                res.status(200).json({
                    ok:true,
                    updatedNewAcount
                });
            };
        }; 
    } 
    catch (error)
    {
        return res.status(500).json({
            ok:false,
            msg: 'Contactar con el administrador'
        });
    }; 
};

const changePassword =async(req, res = express.response)=>{

    const token = req.header('x-token')
    
        if(!token){
            return res.status(401).json({
                ok:false,
                msg:'No hay token en la peticion'
            });
        }
    
        const {rol}= verify(token,process.env.SECRET_JWT_SEED);
        
        const accountId = req.params.id
       
        try 
        {
            if(rol !=="Admin")
            {
                return res.status(400).json({
                    ok:false,
                    msg: 'Solo el administrador puede Actualizar Las Cuentas'
                });
            }
            else
            {
                const account = await Account.findById(accountId)
                if(!account){
                    return res.status(400).json({
                        ok:false,
                        msg: 'La cuenta  no existe'
                    });
                }
                else
                {
                    
                    const newAccount ={...req.body};
                    const { password} = req.body;
                    const salt = bcrypt.genSaltSync();
                    newAccount.password= bcrypt.hashSync( password , salt);
                    const updatedNewAcount = await Account.findByIdAndUpdate(accountId,newAccount,{new:true});
    
                    res.status(200).json({
                        ok:true,
                        updatedNewAcount
                    });
                };
            }; 
        } 
        catch (error)
        {
            return res.status(500).json({
                ok:false,
                msg: 'Contactar con el administrador'
            });
        }; 
    };

const deleteAccount =async(req, res = express.response)=>{

    const token = req.header('x-token')

    if(!token){
        return res.status(401).json({
            ok:false,
            msg:'No hay token en la peticion'
        });
    }

    const {rol}= verify(token,process.env.SECRET_JWT_SEED);

    console.log(rol)

    const accountId = req.params.id

    try 
    {
        if(rol !=="Admin")
        {
            return res.status(400).json({
                ok:false,
                msg: 'Solo el administrador puede Eliminar Las Cuentas'
            });
        }
        else
        {
            const account = await Account.findById(accountId)
            console.log(account)
            console.log(accountId)
            if(!account)
            {
                return res.status(400).json({
                    ok:false,
                    msg: 'Cuenta no existe'
                });
            }
            else
            {
               await Account.findByIdAndDelete(accountId);
              
                res.status(200).json({
                    ok:true,
                    msg: 'Cuenta Eliminada'
                });
            };
        };   
    } 
    catch (error) 
    {
        return res.status(500).json({
            ok:false,
            msg: 'Contactar con el administrador'
        }); 
    };

};



module.exports ={ getAccount,updateAccount,deleteAccount,changePassword,getAccountbyId};