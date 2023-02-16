const {response} = require('express')
const {verify} = require('jsonwebtoken')


const jwtValidation = (req,res = response,next)=>{

    const token = req.header('x-token')
    

    if(!token){
        return res.status(401).json({
            ok:false,
            msg:'Secion Finalizada. Favor iniciar secion.'
        });
    }
    else{

            try {
                const payload = verify(token,process.env.SECRET_JWT_SEED);

                    req.uid = payload.uid;
                    req.name=payload.name;
                    req.rol=payload.rol;
                    
                    
                next();

               return {rol:payload.rol}
                
            } catch (error) {

                console.log(error)

                return res.status(401).json({
                    ok:false,
                    msg:'Token no valido'
                });
                
            };
    };




};

module.exports={

    jwtValidation
}