const express = require('express');
const Cases = require('../../models/Cases/CasesModel')
const moment = require('moment')

const getCases =async(req, res = express.response)=>{

    const {rol} = req;

    if(rol !=="Admin")
        {
            return res.status(400).json({
                ok:false,
                msg: 'Solo el administrador Acceder a Este Punto.'
            });
        }
        else{

            const cases = await Cases.find().sort( {  openDate:-1 } ) 
            .populate({ path: 'openCaseUser', select: 'name , email , company , departament' })
            .populate({ path: 'casesCategory', select: 'title , category , subcategory , priority , description ' })
            .populate({ path: 'closeCaseUser', select: 'name , email , company , departament' })
            
          
            return res.status(200).json({
                ok:true,
                Cases: cases
            });

        }

   
};

const getCasesByUserId =async(req, res = express.response)=>{

    const userId= req.params.id;

    const cases = await Cases.find({"openCaseUser":userId})
    .populate({ path: 'openCaseUser', select: 'name , email , company , departament' })
    .populate({ path: 'casesCategory', select: 'title , category , subcategory , priority , description ' })
    .populate({ path: 'casesCategory.category', select: 'id , category ' }).sort( { openDate: -1 } )
    .populate({ path: 'closeCaseUser', select: 'name , email , company , departament' })
    
    return res.status(200).json({
        ok:true,
        Cases: cases
    });
};

const createCases =async(req, res = express.response)=>{

    const openUser = req.params.openuser
    const casesCategory = req.params.casescategory
    const dates = Date.now();
    const dateNow = moment(dates).format("L");
    const cases = new Cases(req.body);
    try 
    {               
                    cases.openCaseUser= openUser;
                    cases.casesCategory= casesCategory;
                    cases.openDate= dateNow;
                    cases.closeDate=null;
                    cases.closeCaseUser= null
                    cases.notesSuport= null
                    cases.status ="Abierto"
               
                    const caseSave = await cases.save();

                    const findCaseSaved = await Cases.findById(caseSave.id).populate({ path: 'openCaseUser', select: 'name , email , company , departament' })
                    .populate({ path: 'casesCategory', select: 'title , category , subcategory , priority , description ' })
                    .populate({ path: 'casesCategory.category', select: 'id , category ' }).sort( { openDate: -1 } )
                    .populate({ path: 'closeCaseUser', select: 'name , email , company , departament' });

                    return res.status(201).json({
                        ok:true,
                        Case: findCaseSaved
                    });  
    } 
    catch (error) 
    {
        return res.status(500).json({
            ok:false,
            msg: 'Contactar con el administrador',
            error:error
        });
    };
};

const updateUserCases =async(req, res = express.response)=>{

    const caseId= req.params.id
    const newCases ={...req.body};
 
    
    try 
    {

        newCases.closeDate=null;
        newCases.closeCaseUser= null
        newCases.notesSuport= null
        
        const updatedCases = await Cases.findByIdAndUpdate(caseId,newCases,{new:true});
    
        return res.status(200).json({
            ok:true,
            updatedCases:updatedCases 
    });
    } 
    catch (error) 
    {
        return res.status(500).json({
            ok:false,
            msg: 'Contactar con el administrador'
        });
    };
};

const updateAdminCases =async(req, res = express.response)=>{

    const caseId= req.params.id
    const dates = Date.now();
    const dateNow = moment(dates).format("L");
    const newCases ={...req.body};
    const {uid,rol} = req;


    try 
    {
        if(rol !=="Admin")
        {
            return res.status(400).json({
                ok:false,
                msg: 'Solo el administrador puede Cerrar'
            });
        }
        else
        {
            newCases.closeDate = dateNow;
            newCases.closeCaseUser= uid;

            console.log(newCases);
            
            const updatedCases = await Cases.findByIdAndUpdate(caseId,newCases,{new:true});
            
            const findCaseUpdated = await Cases.findById(updatedCases.id).populate({ path: 'openCaseUser', select: 'name , email , company , departament' })
                    .populate({ path: 'casesCategory', select: 'title , category , subcategory , priority , description ' })
                    .populate({ path: 'casesCategory.category', select: 'id , category ' }).sort( { openDate: -1 } )
                    .populate({ path: 'closeCaseUser', select: 'name , email , company , departament' });
        
            return res.status(200).json({
                ok:true,
                updatedCases:findCaseUpdated 
        });

        }

       
    } 
    catch (error) 
    {
        return res.status(500).json({
            ok:false,
            msg: 'Contactar con el administrador',
            error:error
        });
    };
};

const deleteCases =async(req, res = express.response)=>{

    const CasesId = req.params.id;
   
    try 
    {
            const cases = await Cases.findById(CasesId)
            if(!cases)
            {
                return res.status(400).json({
                    ok:false,
                    msg: 'Caso no existe'
                });
            }
            else
            {
                await Cases.findByIdAndDelete(CasesId);
                res.status(200).json({
                    ok:true,
                    msg: 'Caso Eliminado'
                });
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

module.exports ={ getCases,getCasesByUserId,createCases,updateUserCases,updateAdminCases,deleteCases  };