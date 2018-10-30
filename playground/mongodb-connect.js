const { MongoClient } = require('mongodb'); 
MongoClient.connect('mongodb://localhost:27017/todoApp', (err, client)=>{
    const collection = client.db("todoApp").collection("example");
    return collection
        .insertOne({x: 1})
        .then(result => {
        const { insertedId } = result;
        // Do something with the insertedId
        console.log( `Inserted document with _id: ${insertedId}`);
        });    
});