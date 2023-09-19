const exp=require("express")
const sampleApp=exp.Router()

sampleApp.use(exp.json())
sampleApp.get('/get-sample',(request,response)=>{
    // get userCollectionObj
    const sampleCollectionObj=request.app.get("sampleCollectionObj")
    // get user from request
    sampleCollectionObj.find().toArray()
    .then((userList)=>{
        response.status(200).send({message:"UserList",payload:userList})
    })
    .catch((err)=>{
        console.log("Error in geting user",err);
        response.send({message:"Error",errMessage:err.message});
    })
})
sampleApp.post('/create-sample',(request,response)=>{
    // get userCollectionObj
    const sampleCollectionObj=request.app.get("sampleCollectionObj")
    const newUser=request.body;
    sampleCollectionObj.insertOne(newUser)
    .then((dbRes)=>{
        console.log(dbRes)
        response.status(201).send({message:"User-Created"})
    })
    .catch((err)=>{
        console.log("Error in geting user",err);
        response.send({message:"Error",errMessage:err.message});
    })
})
sampleApp.get('/get-sample/:city/:id',(request,response)=>{
    // get userCollectionObj
    const sampleCollectionObj=request.app.get("sampleCollectionObj")
    // get user from request
    const cityPlace=request.params.city;
    const idNo=(+request.params.id);
    console.log(cityPlace)
    console.log(typeof(idNo))
    sampleCollectionObj.findOne({$and:[{id:idNo},{"address.city":cityPlace}]})
    .then((userList)=>{
        response.status(200).send({message:"Found user",payload:userList})
    })
    .catch((err)=>{
        console.log("Error in geting user",err);
        response.send({message:"Error",errMessage:err.message});
    })
})



















module.exports=sampleApp;