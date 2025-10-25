const mongoose = require ('mongoose');

//Define the menu item schema
const menuSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    taste:{
        type:String,
        enum:["sweet","bitter","spicy"],
        required:true
    },
    isDrinkable:{
        type:Boolean,
        required:true
    }
});

//Create menuitem model
const MenuItem = mongoose.model('MenuItem',menuSchema);

module.exports = MenuItem;

/* 
{
    "name":"lemon rice",
    "price": 100,
    "taste":"spicy",
    "isDrinkable": false
}

{
    "name":"rava dosa",
    "price": 200,
    "taste":"spicy",
    "isDrinkable": false
}

{
    "name":"kaju katli",
    "price": 500,
    "taste":"sweet",
    "isDrinkable": false
}

*/