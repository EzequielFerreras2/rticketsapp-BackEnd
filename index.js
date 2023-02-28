const express = require('express');

//creando servidor  express
const app = express();

//configuracion de variables de entorno.
require('dotenv').config();

const cors = require('cors')
const {dbConnection} = require('./database/config');

//DB
dbConnection();

app.use(cors({
    origin: '*'
}));

//directorio publico 
app.use( express.static('public'));

//Lectura y parseo del body
app.use(express.json());

//rutas
app.use('/api/auth',require('./routes/auth'));
app.use('/api/account',require('./routes/account'));
app.use('/api/cases/casescategory',require('./routes/CasesCategories/CasesCategory'));
app.use('/api/cases/category',require('./routes/CasesCategories/CategoryCases'));
app.use('/api/cases/subcategory',require('./routes/CasesCategories/SubCategory'));
app.use('/api/cases',require('./routes/Cases/Cases'));
app.use('/api/email',require('./routes/email/Email'));


app.get('*',(req,res)=>{
    res.sendFile(__dirname+'/public/index.html');
});

//escuchar preticiones
let port= process.env.PORT || 4001;
app.listen(port, () => console.log(`Aclicacion Corre en el Puerto ${process.env.PORT}!`));



