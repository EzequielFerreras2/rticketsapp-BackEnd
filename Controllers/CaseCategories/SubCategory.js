const express = require('express');
const SubCategory = require('../../models/CaseCategories/SubCategoryModel')

const getSubCategory =async(req, res = express.response)=>{
    const subcategory = await SubCategory.find().populate('category','category');
    // const subcategorys = await SubCategory.find({"category":"63b5c86004cae0689fa3aa2c"});
    return res.status(200).json({
        ok:true,
        subCategory: subcategory,
        // prueba:subcategorys
    });
};

const getSubCategoryByCategory =async(req, res = express.response)=>{
    const categoryId = req.params.category
    const subcategory = await SubCategory.find({"category":categoryId});
    return res.status(200).json({
        ok:true,
        subCategory: subcategory,
    });
};


const createSubCategory =async(req, res = express.response)=>{
    const categoryId = req.params.category
    
    const subcategory = new SubCategory(req.body)
    const {rol} = req;
    try 
    {
        if(rol !=="Admin")
        {
            return res.status(400).json({
                ok:false,
                msg: 'Solo el administrador puede Crear Las SubCategorias'
            });
        }
        else
        {
            subcategory.category= categoryId;
            const ESubCategory = await SubCategory.find({"subcategory":req.body.subcategory}).populate({ path: 'category', select: 'category' });
            var evl;

            ESubCategory.map(res =>{

                if( res.subcategory === req.body.subcategory  && res.category.id === categoryId )
                {
                  evl=true;
                }
               });

               if(evl === true){
        
                return res.status(400).json({
                    ok:false,
                    msg: 'Sub Categoria ya Existe'
                });
    
               }
               else {

                const SubCategorySave = await subcategory.save();
                return res.status(201).json({
                ok:true,
                subCategory: SubCategorySave
            }); 
                
               }
            
        }; 
    } 
    catch (error) 
    {
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: 'Contactar con el administrador',

        });
    };
};

const updateSubCategory =async(req, res = express.response)=>{
    const categoryId = req.params.category
    const subcategoryId = req.params.id

    const {rol} = req;
    try 
    {
        if(rol !=="Admin")
        {
            return res.status(400).json({
                ok:false,
                msg: 'Solo el administrador puede Actualizar Las SubCategorias'
            });
        }
        else
        {
            const subcategory = await SubCategory.findById(subcategoryId)
            
            if(!subcategory){
                return res.status(400).json({
                    ok:false,
                    msg: 'SubCategoria no existe'
                });
            }
            else
            {
                
                const newSubCategory ={...req.body};
                if(categoryId===null)
                {
                    newSubCategory.category = req.body.category; 
                }
                else{
                    newSubCategory.category=categoryId;
                }

                 subcategory.category= categoryId;
                const ESubCategory = await SubCategory.find({"subcategory":req.body.subcategory}).populate({ path: 'category', select: 'category' });
                var evl;

            ESubCategory.map(res =>{

                if( res.subcategory === req.body.subcategory  && res.category.id === categoryId )
                {
                  evl=true;
                }
              
               });

               
               if(evl === true){
        
                return res.status(400).json({
                    ok:false,
                    msg: 'Sub Categoria a Actualizar ya Existe'
                });
    
               }
               else{

                    const updatedSubCategory = await SubCategory.findByIdAndUpdate(subcategoryId,newSubCategory,{new:true});
                    res.status(200).json({
                        ok:true,
                        updatedSubCategory
                    });

               }
                
                
            };
        }; 
    } 
    catch (error)
    {
        console.log(error)
        return res.status(500).json({
            ok:false,
            msg: 'Contactar con el administrador'
        });
    }; 
};

const deleteSubCategory =async(req, res = express.response)=>{

    const subcategoryId = req.params.id;
    const {rol} = req;
    try 
    {
        if(rol !=="Admin")
        {
            return res.status(400).json({
                ok:false,
                msg: 'Solo el administrador puede Eliminar Las SubCategorias'
            });
        }
        else
        {
            const subcategory = await SubCategory.findById(subcategoryId)
            if(!subcategory)
            {
                return res.status(400).json({
                    ok:false,
                    msg: 'SubCategoria no existe'
                });
            }
            else
            {
                await SubCategory.findByIdAndDelete(subcategoryId,);
                res.status(200).json({
                    ok:true,
                    msg: 'SubCategoria Eliminada'
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



module.exports ={ getSubCategory,getSubCategoryByCategory,createSubCategory,updateSubCategory,deleteSubCategory};