const express = require('express');
const CasesCategory = require('../../models/CaseCategories/CasesCategoryModel');
const Category = require('../../models/CaseCategories/CategoryModel');
const SubCategory = require('../../models/CaseCategories/SubCategoryModel');

const getCasesCategory =async(req, res = express.response)=>{
    const casesCategory = await CasesCategory.find().populate({ path: 'subcategory', select: 'subcategory , category' })
    .populate({ path: 'category', select: 'category' });
    return res.status(200).json({
        ok:true,
        CasesCategory: casesCategory
    });
};

const getCasesCategoryByid =async(req, res = express.response)=>{
    const casesCategory = await CasesCategory.find().populate({ path: 'subcategory', select: 'subcategory , category' })
    .populate({ path: 'category', select: 'category' });
    return res.status(200).json({
        ok:true,
        CasesCategory: casesCategory
    });
};

const getCasesCategoryBySubCategory =async(req, res = express.response)=>{
    const subcategoryId = req.params.subcategory
    const casesCategory = await CasesCategory.find({"subcategory":subcategoryId}).populate({ path: 'subcategory', select: 'subcategory , category' })
    .populate({ path: 'category', select: 'category' });
    return res.status(200).json({
        ok:true,
        CasesCategory: casesCategory,
    });
};

const findCasesCategory =async(req, res = express.response)=>{
    const categoryId = req.params.category
    const subcategoryId = req.params.subcategory
    const casecategory = await CasesCategory.find({"category":categoryId,"subcategory":subcategoryId}).populate({ path: 'subcategory', select: 'subcategory , category' })
    .populate({ path: 'category', select: 'category' });
    return res.status(200).json({
        ok:true,
        CaseCategory: casecategory,
    });
};

const getCasesCategoryByCategory =async(req, res = express.response)=>{
    const categoryId = req.params.category
    const casecategory = await CasesCategory.find({"category":categoryId}).populate({ path: 'subcategory', select: 'subcategory , category' })
    .populate({ path: 'category', select: 'category' });
    return res.status(200).json({
        ok:true,
        CaseCategory: casecategory,
    });
};

const createCasesCategory =async(req, res = express.response)=>{

    const subcategoryId = req.params.subcategory
    const categoryId = req.params.category

    const casesCategory = new CasesCategory(req.body)
  
    const {rol} = req;
    try 
    {
        if(rol !=="Admin")
        {
            return res.status(400).json({
                ok:false,
                msg: 'Solo el administrador puede Crear Las Categorias'
            });
        }
        else
        {
            const category = await Category.findById(categoryId);
            const suBcategory = await SubCategory.findById(subcategoryId);

            const EcasesCategory = await CasesCategory.find({"title":req.body.title}).populate({ path: 'subcategory', select: 'subcategory , category' })
            .populate({ path: 'category', select: 'category' });
            var evl;

            if(category.id !== suBcategory.category.toString())
            {
                return res.status(400).json({
                    ok:false,
                    msg: 'La categoria incorrecta'
                });
            }
            else{
                EcasesCategory.map(res =>{

                    if( res.title === req.body.title && res.category.id === categoryId && res.subcategory.id === subcategoryId)
                    {
                      evl=true;
                    }
                   });
        
        
                   if(evl === true){
        
                    return res.status(400).json({
                        ok:false,
                        msg: 'Caso ya Existe'
                    });
        
                   }
                   else{

                    casesCategory.subcategory= subcategoryId;
                    casesCategory.category= categoryId;
                    const caseCategorySave = await casesCategory.save();
                    return res.status(201).json({
                        ok:true,
                        CaseCategory: caseCategorySave
                    });
        
                   };
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

const updateCasesCategory =async(req, res = express.response)=>{

    const caseCategoryId = req.params.id
    const subcategoryId = req.params.subcategory
    const categoryId = req.params.category

    const {rol} = req;
    try 
    {
        if(rol !=="Admin")
        {
            return res.status(400).json({
                ok:false,
                msg: 'Solo el administrador puede Actualizar Las Categorias'
            });
        }
        else
        {
            const casesCategory = await CasesCategory.findById(caseCategoryId)
            if(!casesCategory){
                return res.status(400).json({
                    ok:false,
                    msg: 'Caso no existe'
                });
            }
            else
            {
                const newCasesCategory ={...req.body};

                if(subcategoryId===null){newCasesCategory.subcategory = req.body.subcategory; }
                else{newCasesCategory.subcategory=subcategoryId;};

                if(categoryId===null){newCasesCategory.category = req.body.category; }
                else{newCasesCategory.category=categoryId;};

                const category = await Category.findById(categoryId)
                const suBcategory = await SubCategory.findById(subcategoryId)
                const EcasesCategory = await CasesCategory.find({"title":req.body.title}).populate({ path: 'subcategory', select: 'subcategory , category' })
                .populate({ path: 'category', select: 'category' });
                var evl;


                if(category.id !== suBcategory.category.toString())
                {
                    return res.status(400).json({
                        ok:false,
                        msg: 'La categoria incorrecta'
                    });
                }
                else{

                    EcasesCategory.map(res =>{

                        if( res.title === req.body.title && res.category.id === categoryId && res.subcategory.id === subcategoryId && res.id !== caseCategoryId)
                        {
                          evl=true;
                        }
                       });
            
                       if(evl === true){
            
                        return res.status(400).json({
                            ok:false,
                            msg: 'Caso ya Existe'
                        });
            
                       }
                       else{

                        const updatedCasesCategory = await CasesCategory.findByIdAndUpdate(caseCategoryId,newCasesCategory,{new:true});
                        res.status(200).json({
                        ok:true,
                        updatedCasesCategory:updatedCasesCategory    
                    });
                       }
                };
               
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

const deleteCasesCategory =async(req, res = express.response)=>{

    const caseCategoryId = req.params.id;
    const {rol} = req;
    try 
    {
        if(rol !=="Admin")
        {
            return res.status(400).json({
                ok:false,
                msg: 'Solo el administrador puede Eliminar Las Categorias'
            });
        }
        else
        {
            const casesCategory = await CasesCategory.findById(caseCategoryId)
            if(!casesCategory)
            {
                return res.status(400).json({
                    ok:false,
                    msg: 'Caso no existe'
                });
            }
            else
            {
                await CasesCategory.findByIdAndDelete(caseCategoryId,);
                res.status(200).json({
                    ok:true,
                    msg: 'Caso Eliminado'
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



module.exports ={ getCasesCategory,getCasesCategoryBySubCategory,
    getCasesCategoryByCategory,createCasesCategory,updateCasesCategory,
    deleteCasesCategory,findCasesCategory};