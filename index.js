const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000 ;

app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://newDB:hOm0PP17Zx2s8cte@cluster0.vp17s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    const database = client.db("newDb");
    const movies = database.collection("users");
    app.get("/users", async (req, res) => {
        const result = await movies.find.toArray() ;
        console.log(result);
        res.send(result)
    })
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
// run().catch(console.dir);




app.get("/", (req,res) => {
    res.send("Database is coming soon!");
})

app.listen(port ,(req,res) => {
    console.log(`Server is running on port ${port}`);
});