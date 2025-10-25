const mongoose = require ('mongoose');

//Define the person schema
const personSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    work:{
        type:String,
        enum:['chef','waiter','manager'],
        required:true
    },
    salary:{
        type:Number,

    },
    mobile:{
        type:Number
    },
    email:{
        type:String,
        required:true,
        unique:true
    }
});

//create person model
const Person = mongoose.model('Person',personSchema);

module.exports = Person;


/*Dummy person data

{
    "name":"pramod",
    "age":25,
    "work": "manager",
    "salary": 123000000,
    "mobile":12344567788,
    "email":"abcd@gmail.com"
}


{
    "name":"pramod verma",
    "age":26,
    "work": "chef",
    "salary": 100000,
    "mobile":123467788,
    "email":"abd@gmail.com"
}

{
    "name":"pinku",
    "age":22,
    "work": "waiter",
    "salary": 1000066540,
    "mobile":12346778845,
    "email":"xyd@gmail.com"
}
    */