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


    const request = mailjet.post('send', { version: 'v3.1' }).request({
        Messages: [
          {
            From: {
              Email: 'rticketspost@gmail.com',
              Name: 'RticketsApp',
            },
            To: [
              {
                Email: 'ezequielferreras2@gmail.com',
                Name: 'ezequielferreras2@gmail.com',
              },
            ],
            Subject: 'Caso #: 112694654351.10',
            TextPart: 'Greetings from Mailjet!',
            HTMLPart:
              '<h3>Dear passenger 1, welcome to <a href="https://www.mailjet.com/">Mailjet</a>!</h3><br />May the delivery force be with you!',
          },
        ],
      })
      request
        .then(result => {
          return res.status(200).json({
            ok:true,
            result:result
        });
        })
        .catch(err => {
          return res.status(500).json({
            ok:false,
            msg: 'Contactar con el administrador',
            error:err
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
      })
      .catch(err => {
        console.log(err.statusCode)
      })

    };
    

    
}

module.exports ={sendCreateCasesEmail,sendCloseCasesEmail};