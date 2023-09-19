
// creating a simple fetch request to see how we are consuming promise
// uisng then and catch.
const MakeApiReq=()=>{
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(res=>res.json())
    .then(data=>console.log(data))
    .catch(err=>console.log(err))
}

MakeApiReq()
// creating a sample fetch function and now we are using async and await
// for consuming the promice.
console.log("Using async and await");
const MakeApiReq2=async()=>{
    let res=await fetch('https://jsonplaceholder.typicode.com/users')
    let data=await res.json()
    console.log(data)

} 

MakeApiReq2()