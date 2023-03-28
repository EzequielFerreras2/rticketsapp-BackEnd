const express = require('express');
const XLSX = require('xlsx');
const fsa =require('fs');






const readEmailsExcelBook = async(req, res = express.response) =>{

    const workBook = XLSX.readFile("Controllers/Directory/EmailDiretory.xlsx");
    const workBookSheets =workBook.SheetNames;
    console.log(workBookSheets)
    const sheet  = workBookSheets[0];
    const data=XLSX.utils.sheet_to_json(workBook.Sheets[sheet]);
    

    return res.status(200).json({
        ok:true,
        workBookSheets: workBookSheets,
        data:data
    });

}

module.exports ={readEmailsExcelBook };