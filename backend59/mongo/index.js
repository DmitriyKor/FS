import { MongoClient, ServerApiVersion } from 'mongodb';
import { add, getByEmail, setActive } from '../services/user.services.js';

class Mongo {
    client = null;
    constructor() {
        const uri = `mongodb+srv://${process.env.MONGODB_USER_NAME}:${process.env.MONGODB_PASSWORD}@fstesting.bravgel.mongodb.net/?retryWrites=true&w=majority&appName=FSTesting`;
        this.client = new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });
    }
    async run() {
        try {
            // Connect the client to the server	(optional starting in v4.7)
            await this.client.connect();
            // Send a ping to confirm a successful connection
            await this.client.db("admin").command({ ping: 1 });
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
            //return this.client.db(process.env.MONGODB_DATABASE_NAME);
        } catch(e) {
            // Ensures that the client will close when you finish/error
            await this.client.close();
        }
    }
}

async function runMongo() {
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const uri = `mongodb+srv://${process.env.MONGODB_USER_NAME}:${process.env.MONGODB_PASSWORD}@fstesting.bravgel.mongodb.net/?retryWrites=true&w=majority&appName=FSTesting`;

    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

export var mongo = null;

export const initMongo = async()=>{
    mongo = new Mongo();
    await mongo.run().catch(console.dir);
    
    //tests
    // var res = await add({name: "Alex", email: 'alex@gmail.com', startBalance: 0, activated:false, hashedPassword:'fewfewfwe', activated:false});
    // console.log('add:', res);
    // var user = await getByEmail('alex@gmail.com');
    // console.log('getByEmail:',user);
    // var user = await getByEmail('alexrrrr@gmail.com');
    // console.log('getByEmail:', user);
    // var res = await setActive('alex@gmail.com');
    // console.log('setActive:', res);
}


