const express = require ('express');
const router = express.Router();
const Person = require ('../modules/person.js');

//POST route to add a person
router.post('/',async (req,res)=>{
    try{
        const data = req.body;//assuming the req body contains the person's data

        //Create a new person document using the mongoose model
        const newPerson = new Person(data);

        //Save the new person to the database
        const response = await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);
        
    }
    catch(err){
        console.log(err);
        res.status(500).json({err:"internal server error"});
        
    }
});

//GET method to get person data
router.get('/',async (req,res)=>{
    try{ 
        const data = await Person.find();
    console.log('data fetched');
    res.status(200).json(data);
}catch(err){
    console.log(err);
        res.status(500).json({err:"internal server error"});
}
});

//parametrised API call: passing parameter in API endpoints
router.get('/:workType', async (req,res)=>{
    try{
        const workType = req.params.workType;//extract the worktype from url parameter
        if(workType == 'chef' || workType == 'waiter' || workType == 'manager'){
            const response = await Person.find({work:workType});
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
        const personId = req.params.id; //extract the id from the url parameter
        const updatedPersonData = req.body;  //updated data for the person

        const response = await Person.findByIdAndUpdate(personId,updatedPersonData,{
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
});

//Delete operation
router.delete('/:id', async (req,res)=>{
    try{
        const personId = req.params.id; //extract the persons id from the url parameter

        //Assuming you have a person model
        const response = await Person.findByIdAndDelete(personId);
        if(!response){
            return res.status(404).json({error:"person not found"})
        }
        console.log("data deleted");
        res.status(200).json({message:"person deleted successfully"});

    }catch(err){
        console.log(err);
        res.status(500).json("Internal server error");
    }
});

module.exports = router;
