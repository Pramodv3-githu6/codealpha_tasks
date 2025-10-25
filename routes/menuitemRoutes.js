const express = require('express');
const router = express.Router();
const MenuItem = require ('../modules/menuitem.js');

//Post method to add menuitem
router.post('/', async (req,res)=>{
     try{
        const data = req.body;//assuming the req body contains the person's data

        //Create a new person document using the mongoose model
        const newitem = new MenuItem(data);

        //Save the new person to the database
        const response = await newitem.save();
        console.log('data saved');
        res.status(200).json(response);
        
    }
    catch(err){
        console.log(err);
        res.status(500).json({err:"internal server error"});
        
    }
});

//GET method to get menuitems
router.get('/',async (req,res)=>{
    try{
    const dat =await MenuItem.find();
    console.log("data fetched");
    res.status(200).json(dat);
    }catch(err){
        console.log(err);
        res.status(500).json("internal server error");
    }
});

//parametrised API call: passing parameter in API endpoints
router.get('/:tasteType', async (req,res)=>{
    try{
        const tasteType = req.params.tasteType;//extract the tasteType from url parameter
        if(tasteType == 'spicy' || tasteType == 'bitter' || tasteType == 'sweet'){
            const response = await MenuItem.find({taste:tasteType});
            console.log('response fetched');
            res.status(200).json(response);
            
        }
    }catch(err){
        console.log(err);
        res.status(500).json("Internal server error");
    }
});


//Update operation
router.put('/:id', async (req,res)=>{
    try{
        const menuid = req.params.id; //extract the id from the url parameter
        const updatedmenuData = req.body;  //updated data for the person

        const response = await MenuItem.findByIdAndUpdate(menuid,updatedmenuData,{
            new: true, //return the updated doccument 
            runValidators : true, //run mongoose validation
        });
        if(!response){
            return res.status(400).json({error:"Person not found"});
        }
        console.log("data updated");
        res.status(200).json(response)
        
    }catch(err){
         console.log(err);
        res.status(500).json("Internal server error");
    }
})

module.exports = router;