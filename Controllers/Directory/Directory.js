const express = require('express');
const XLSX = require('xlsx');


const readEmailsExcelBook = async(req, res = express.response) =>{
    const workBook = await XLSX.readFile("Controllers/Directory/EmailDiretory.xlsx");
    const workBookSheets =workBook.SheetNames;
    const sheet  = workBookSheets[0];
    const data= await XLSX.utils.sheet_to_json(workBook.Sheets[sheet]);
    return res.status(200).json({
        ok:true,
        workBookSheets: workBookSheets,
        data:data
    });
}
const readPhonesExcelBook = async(req, res = express.response) =>{
    const workBook = await XLSX.readFile("Controllers/Directory/EmailDiretory.xlsx");
    const workBookSheets =workBook.SheetNames;
    const sheet  = workBookSheets[0];
    const data= await XLSX.utils.sheet_to_json(workBook.Sheets[sheet]);
    return res.status(200).json({
        ok:true,
        workBookSheets: workBookSheets,
        data:data
    });
}

const readflotasExcelBook = async(req, res = express.response) =>{
    const workBook = await XLSX.readFile("Controllers/Directory/Flotas.xlsx");
    const workBookSheets =workBook.SheetNames;
    const sheet  = workBookSheets[0];
    const data= await XLSX.utils.sheet_to_json(workBook.Sheets[sheet]);
    return res.status(200).json({
        ok:true,
        workBookSheets: workBookSheets,
        data:data
    });
}




module.exports ={readEmailsExcelBook,readflotasExcelBook };