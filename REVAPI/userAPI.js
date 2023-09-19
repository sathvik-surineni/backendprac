const exp=require("express")
const userAPP2=exp.Router()
// body parsing
userAPP2.use(exp.json())

// get operation
userAPP2.get('/get-user',async(request,response)=>{
    const userasyncCollectionObj=request.app.set("userasyncCollectionObj")
    let userList=await userasyncCollectionObj.find().toArray()
    response.status(200).send({message:"Found USer",payload:userList})
})
// post operation
userAPP2.post('/create-user',async(request,response)=>{
    const userasyncCollectionObj=request.app.set("userasyncCollectionObj")
    const newUser=request.body
    await userasyncCollectionObj.insertOne(newUser)
    response.status(201).send({message:"Created user"})
})

// put operation
userAPP2.put('/update-user',async(request,response)=>{
    const userasyncCollectionObj=request.app.set("userasyncCollectionObj")
    const updateUser=request.body
    console.log(updateUser.id)
    await userasyncCollectionObj.updateOne({id:updateUser.id},{$set:{...updateUser}})
    response.status(200).send({message:"Update User"})
})

//delete operation
userAPP2.delete('/delete-user/:id',async(request,response)=>{
    const userasyncCollectionObj=request.app.set("userasyncCollectionObj")
    const delId=(+request.params.id)
    await userasyncCollectionObj.deleteOne({id:delId})
    response.status(200).send({message:"delete User"})
})












module.exports=userAPP2;