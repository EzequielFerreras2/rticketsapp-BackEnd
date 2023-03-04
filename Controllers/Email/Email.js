const express = require('express');
const {getCasesCategoryByid}= require('../CaseCategories/CasesCategory')
const Mailjet = require('node-mailjet')

const mailjet = Mailjet.apiConnect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE,
  {
    config: {},
    options: {}
  } 
  );

  const sendCreateCasesAdminEmail = async(req, res = express.response)=>{

    const {openCaseUser,id,status,casesCategory,openDate,details} = req.body;
    const minCasesID= id?.slice(-7);
    var categoryCases={} ;
    await getCasesCategoryByid( casesCategory._id).then(result =>{
    Object.assign(categoryCases,result);
    });
   
    const request = mailjet
	.post("send", {'version': 'v3.1'})
	.request({
		"Messages":[
      {
        "From": {
          "Email": `${process.env.MASTER_EMAIL}`,
          "Name": "RticketsPost"
        },
        "To": [
          {
            "Email": `ezequielferreras2@gmail.com`,
            "Name": `Ezequiel Ferreras`
          }
				],
				"TemplateID": 4625927,
				"TemplateLanguage": true,
				"Subject": `AdminPost: ${status}`,
				"Variables": {
      "caseId": `${minCasesID}`,
      "status": `${status}`,
      "title": `${casesCategory?.title}`,
      "subCategory": `${categoryCases?._doc.subcategory.subcategory}`,
      "category": `${categoryCases?._doc.category.category}`,
      "userName": `${openCaseUser?.name}`,
      "userEmail": `${openCaseUser?.email}`,
      "userDepartament": `${openCaseUser?.departament}`,
      "openDate": `${openDate}`,
      "details": `${details}`
    }
			}
		]
	})
    request
    .then(result => {
      console.log(result.body)
      return res.status(200).json({
        ok:true,
        email:result.body
      });
      
    })
    .catch(err => {
      console.log(err.statusCode)
      return res.status(200).json({
        ok:false,
        error:err.statusCode
      });
    })


  
  };

const sendCreateCasesEmail =(req, res = express.response)=>{

  const {openCaseUser,id,status,casesCategory,openDate,details} = req.body;
  const minCasesID= id?.slice(-7);
  const request = mailjet
	.post("send", {'version': 'v3.1'})
	.request({
		"Messages":[
			{
        "From": {
          "Email": `${process.env.MASTER_EMAIL}`,
          "Name": "RticketsPost"
        },
        "To": [
          {
            "Email": `${openCaseUser.email}`,
            "Name": `${openCaseUser.name}`
          }
        ],
				"TemplateID": 4625387,
				"TemplateLanguage": true,
				"Subject": `${status}`,
				"Variables": {
      "caseId": `${minCasesID}`,
      "status": `${status}`,
      "title": `${casesCategory?.title}`,
      "openDate": `${openDate}`,
      "details": `${details}`
    }
			}
		]
	})
  request
    .then(result => {
      console.log(result.body)
      return res.status(200).json({
        ok:true,
        email:result.body
      });
      
    })
    .catch(err => {
      console.log(err.statusCode)
      return res.status(200).json({
        ok:false,
        error:err.statusCode
      });
    })

};
const sendCloseCasesEmail =(req, res = express.response)=>{

  const {openCaseUser,id,status,closeDate,casesCategory,notesSuport,openDate,closeCaseUser} = req.body;
  const minCasesID= id?.slice(-7);
  console.log("req.body")
  console.log(req.body)

    if(status==="Cerrado Incorrecto" || status==="Cerrado No Resuelto"|| status==="Cerrado Satisfactorio")
    {

      const request = mailjet
      .post("send", {'version': 'v3.1'})
      .request({
        "Messages":[
          {
            "From": {
              "Email": `${process.env.MASTER_EMAIL}`,
              "Name": "RticketsPost"
            },
            "To": [
              {
                "Email": `${openCaseUser.email}`,
                "Name": `${openCaseUser.name}`
              }
            ],
            "TemplateID": 4622141,
            "TemplateLanguage": true,
            "Subject": `${status}`,
            "Variables": {
          "caseId": `${minCasesID}`,
          "status": `${status}`,
          "title": `${casesCategory?.title}`,
          "openDate": `${openDate}`,
          "closeDate": `${closeDate}`,
          "closeCaseUser": `${closeCaseUser?.name}`,
          "notesSuport": `${notesSuport}`
        }
          }
        ]
      }) 
      request
    .then(result => {
      console.log(result.body)
      return res.status(200).json({
        ok:true,
        email:result.body
      });
      
    })
    .catch(err => {
      console.log(err.statusCode)
      return res.status(200).json({
        ok:false,
        error:err.statusCode
      });
    })
    }; 
}




module.exports ={sendCreateCasesEmail,sendCloseCasesEmail,sendCreateCasesAdminEmail};