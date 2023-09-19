// create an mini-express app(A router)
const exp=require("express")
const userApp=exp.Router()
// body parsing middleware
userApp.use(exp.json())


// GET Operation
userApp.get('/get-user',(request,response)=>{
    // get userCollectionObj
    const userCollectionObj=request.app.get("userCollectionObj")
    // get user from request
    userCollectionObj.find().toArray()
    .then((userList)=>{
        response.status(200).send({message:"UserList",payload:userList})
    })
    .catch((err)=>{
        console.log("Error in geting user",err);
        response.send({message:"Error",errMessage:err.message});
    })
})

// post(Create) operation
userApp.post('/create-user',(request,response)=>{
    // get userCollectionObj
    const userCollectionObj=request.app.get("userCollectionObj")
    const newUser=request.body;
    userCollectionObj.insertOne(newUser)
    .then((dbRes)=>{
        console.log(dbRes)
        response.status(201).send({message:"User-Created"})
    })
    .catch((err)=>{
        console.log("Error in geting user",err);
        response.send({message:"Error",errMessage:err.message});
    })
})
//put(update)
userApp.put('/update-user',(request,response)=>{
    // get userCollectionObj
    const userCollectionObj=request.app.get("userCollectionObj")
    const modUser=request.body;
    userCollectionObj.updateOne({id:modUser.id},{$set:{...modUser}})
    .then((dbRes)=>{
        response.status(200).send({message:"user updated"})
    })
    .catch((err)=>{
        console.log("Error in geting user",err);
        response.send({message:"Error",errMessage:err.message});
    })
})
userApp.delete('/delete-user/:id',(request,response)=>{
    // get userCollectionObj
    const userCollectionObj=request.app.get("userCollectionObj")
    const delId=(+request.params.id)
    userCollectionObj.deleteOne({id:delId})
    .then((dbRes)=>{
        response.status(200).send({message:"user deleted"})
    })
    .catch((err)=>{
        console.log("Error in geting user",err);
        response.send({message:"Error",errMessage:err.message});
    })
})










// exporting of userapi route into server.js
module.exports=userApp;