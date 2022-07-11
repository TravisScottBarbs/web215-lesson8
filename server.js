import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Pusher from "pusher";
import dbModel from "./dbModel.js";


//app config
const app = express();
const port = process.env.PORT || 8080;

const pusher = new Pusher({
  appId: "1434888",
  key: "4d3f4e0f2d5b9fe4d126",
  secret: "11e33f01aca5bbe1ba4a",
  cluster: "us2",
  useTLS: true
});


//middlewares
app.use(express.json()); // pass everything as json
app.use(cors()); 

// db config
const connection_url = 'mongodb+srv://admin:nx4ZK11yZgW4UEFp@cluster0.dgdox.mongodb.net/instaDB?retryWrites=true&w=majority';
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
    console.log('DB Connected');

    const changeStream = mongoose.connection.collection('posts').watch();

    changeStream.on('change', (change) => {
        console.log('Change Triggered on pusher...')
        console.log(change)
        console.log('End of Change')

        if (change.operationType === 'insert') {
            console.log('Triggering pusher ***img upload***')
            const postDetails = change.fullDocument;
            pusher.trigger('posts', 'inserted', {
                user: postDetails.user,
                caption: postDetails.caption,
                image: postDetails.image,
            })
        } else {
            console.log('Unknown trigger from pusher');
        }
    })
});


    
//api endpoints
app.get('/', (req, res) => res.status(200).send('Hello world 123'));

app.post('/upload', (req, res) => {
    const body = req.body;

    dbModel.create(body, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    });
});

app.get('/sync', (req, res) => {
    dbModel.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    })
})


//listener
app.listen(port, () => console.log('listening on localhost:${port}'));