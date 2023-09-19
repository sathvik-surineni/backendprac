const exp = require("express");
const app = exp();

app.listen(5600, () => console.log("Server is connected to port 5600.."));

const mClient = require('mongodb').MongoClient;

mClient.connect("mongodb://127.0.0.1:27017")
  .then((client) => {
    // Connect to the database
    const db = client.db('sampleDB');
    // Connect to the collection
    const userCollectionObj = db.collection("UsersCollection");
    const sampleCollectionObj=db.collection("sampleCollection");
    const userasyncCollectionObj=db.collection("userasyncCollectionObj");
    // setting of collection obj.
    app.set("userCollectionObj",userCollectionObj)
    app.set("sampleCollectionObj",sampleCollectionObj)
    app.set("userasyncCollectionObj",userasyncCollectionObj)
    console.log("Database Connected successfully");

    // Now, you can pass the 'userCollectionObj' to your route or do further operations here.
  })
  .catch(err => console.log("Database Connection Error:", err));

const userApp = require("./API/userApi");
const sampleApp=require("./API/sampleApi")
const userAPP2=require("./REVAPI/userAPI")
// setting the path 
app.use('/userApi', userApp);
app.use('/sample',sampleApp);
app.use('/userasync',userAPP2)

// Error and invalidpath handling middlewares
const errorHandlingMiddleware=(error,request,response,next)=>{
  response.send({message:error})
}
app.use(errorHandlingMiddleware)

const invalidPathMiddleware=(request,response,next)=>{
  response.send({message:'Invalid Path'})
}
app.use("*",invalidPathMiddleware)

