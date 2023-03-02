const express = require('express');

const Mailjet = require('node-mailjet')

const mailjet = Mailjet.apiConnect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE,
  {
    config: {},
    options: {}
  } 
  )

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
  })
  .catch(err => {
    console.log(err.statusCode)
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
      })
      .catch(err => {
        console.log(err.statusCode)
      })

    };
    

    
}

module.exports ={sendCreateCasesEmail,sendCloseCasesEmail};