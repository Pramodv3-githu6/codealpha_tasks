const express = require ('express');
const app = express();
const db = require ('./database.js');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send("welcome to my hotel. How can i help you.");
});

//Import the router files
const personRoutes = require('./routes/personRoute.js');
const menuitemRoutes = require('./routes/menuitemRoutes.js');

//use the express routers
app.use('/person',personRoutes);
app.use('/menu',menuitemRoutes);




app.listen(3000,()=>{
    console.log(`Listening on port http://localhost:3000`);
    
});

//this is test comment