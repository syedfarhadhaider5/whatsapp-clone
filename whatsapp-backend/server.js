import express from "express";
import mongoose from "mongoose";
import messages from "./schema/messages.js";
import Pusher from "pusher";
import cors from "cors";
const app = express();
const port =9000;


// middleware
app.use(express.json())
app.use(cors());

const pusher = new Pusher({
    appId: "1440203",
    key: "71d9378fae64d94c822e",
    secret: "7d00e1c86a1415b04710",
    cluster: "ap2",
    useTLS: true
  });

const connection_url= "mongodb+srv://farhad:farhad@cluster0.0gcgdyx.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(connection_url,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

  app.get('/messages/sync', (req, res) => {
    messages.find( (err, data) => {
       if(err)
       {
           res.status(500).send(err)
       }
       else{
           res.status(200).send(data)

       }
    })
 });
  app.post('/messages/new', (req, res) => {
     const all_messages = req.body;
     messages.create(all_messages, (err, data) => {
        if(err)
        {
            res.status(500).send(err)
        }
        else{
            res.status(201).send(data)

        }
     })
  });
// check for db connection and it is only run when post run 
 const db = mongoose.connection;
 db.once("open", () =>{
    const msCollection = db.collection("messages");
    const mongoStreamms = msCollection.watch();
    // save row message on pusher and db same time when post request run
    mongoStreamms.on("change", (change) =>{
        console.log(change);
        if(change.operationType  === "insert")
        {
            const messageDetails = change.fullDocument;
            pusher.trigger("messageChanel","insertedEvent",{
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received  
            })
        }
    })
 })
  app.listen(port, () => console.log(`Backend run on ${port}`))