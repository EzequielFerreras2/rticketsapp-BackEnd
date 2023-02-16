const express = require('express');
const Category = require('../../models/CaseCategories/CategoryModel')

const getCategory =async(req, res = express.response)=>{
    const category = await Category.find();
    return res.status(200).json({
        ok:true,
        category: category
    });
};

const createCategory =async(req, res = express.response)=>{
    
    const category = new Category(req.body)
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
            const CategorySave = await category.save();
            return res.status(201).json({
                ok:true,
                CaseCategory: CategorySave
            }); 
        }; 
    } 
    catch (error) 
    {
        return res.status(500).json({
            ok:false,
            msg: 'Contactar con el administrador',

        });
    };
};

const updateCategory =async(req, res = express.response)=>{

    const categoryId = req.params.id
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
            const category = await Category.findById(categoryId)
            if(!category){
                return res.status(400).json({
                    ok:false,
                    msg: 'Categoria no existe'
                });
            }
            else
            {
                const newCategory ={...req.body};
                const updatedCategory = await Category.findByIdAndUpdate(categoryId,newCategory,{new:true});
                res.status(200).json({
                    ok:true,
                    updatedCategory
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

const deleteCategory =async(req, res = express.response)=>{

    const categoryId = req.params.id;
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
            const category = await Category.findById(categoryId)
            if(!category)
            {
                return res.status(400).json({
                    ok:false,
                    msg: 'Categoria no existe'
                });
            }
            else
            {
                await Category.findByIdAndDelete(categoryId,);
                res.status(200).json({
                    ok:true,
                    msg: 'Categoria Eliminada'
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



module.exports ={ getCategory,createCategory,updateCategory,deleteCategory};