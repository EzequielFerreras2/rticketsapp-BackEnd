const express = require('express');
const XLSX = require('xlsx');


const readEmailsExcelBook = async(req, res = express.response) =>{
    try {
    const workBook = await XLSX.readFile("Controllers/Directory/EmailDiretory.xlsx");
    const workBookSheets =workBook.SheetNames;
    const sheet  = workBookSheets[0];
    const data= await XLSX.utils.sheet_to_json(workBook.Sheets[sheet]);
    return res.status(200).json({
        ok:true,
        workBookSheets: workBookSheets,
        Emails:data
    });
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg: 'Contactar con el administrador',
            error:error
        });
    } 
};
const readPhonesExcelBook = async(req, res = express.response) =>{
    try {
        const workBook = await XLSX.readFile("Controllers/Directory/Ext.xlsx");
        const workBookSheets =workBook.SheetNames;
        const sheet  = workBookSheets[0];
        const data= await XLSX.utils.sheet_to_json(workBook.Sheets[sheet]);
        return res.status(200).json({
            ok:true,
            workBookSheets: workBookSheets,
            Phones:data
        });  
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg: 'Contactar con el administrador',
            error:error
        }); 
    } 
};

const readflotasExcelBook = async(req, res = express.response) =>{
    try {
    const workBook = await XLSX.readFile("Controllers/Directory/Flotas.xlsx");
    const workBookSheets =workBook.SheetNames;
    const sheet  = workBookSheets[0];
    const data= await XLSX.utils.sheet_to_json(workBook.Sheets[sheet]);
    return res.status(200).json({
        ok:true,
        workBookSheets: workBookSheets,
        Flotas:data
    });
        
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg: 'Contactar con el administrador',
            error:error
        });
    } 
};




module.exports ={readEmailsExcelBook,readflotasExcelBook,readPhonesExcelBook};