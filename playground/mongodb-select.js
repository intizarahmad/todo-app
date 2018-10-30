const { MongoClient } = require('mongodb'); 
MongoClient.connect('mongodb://localhost:27017/todoApp', (err, client)=>{
    if(err){
        console.log("Error in connecting");
    }
    db = client.db;
    console.log(client);
    // db.collection("example").find()
    //     .toArray()
    //     .then(result => {
       
    //     // Do something with the insertedId
    //     console.log( `result: ${result}`);
    //     }, err=>{
    //         console.log('Error',err);
    //     });    
});