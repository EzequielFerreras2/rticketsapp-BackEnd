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

const sendCreateCasesEmail =()=>{

  console.log(mailjet)
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
          console.log("result.body")
          console.log(result.body)
        })
        .catch(err => {
          console.log("err.statusCode")
          console.log(err.statusCode)
        })

};
const sendCloseCasesEmail =()=>{

    const request = mailjet.post('send', { version: 'v3.1' }).request({
        Messages: [
          {
            From: {
              Email: 'rticketspost@gmail.com',
              Name: 'rticketspost',
            },
            To: [
              {
                Email: 'ezequielferreras078@outlook.com',
                Name: 'User',
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
          console.log(result.body)
        })
        .catch(err => {
          console.log(err.statusCode)
        })
    
}

module.exports ={sendCreateCasesEmail,sendCloseCasesEmail};