//This is the main backend part

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require("cors");

//Refering to other custom module
const JsonHandler = require('./JsonHandler');
const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin:"http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

//variable
outputjson = {};

// obtains a socket!
io.on('connection', (socket) => {
   console.log('A user connected ' + socket.id);


    socket.on('disconnect', () => {
        //console.log('User disconnected');
    });

    socket.on('chat message', (msg) => {
        console.log("Received: "+msg);
        io.emit('chat message', msg);
    });

    // Sending JSON data to the client
    socket.on('Demand_latest_output', () => {
        demandoutput();
        console.log("Output Json = "+outputjson);
        // socket.emit('dataFromServer', "outputjson");
        socket.emit('dataFromServer', outputjson);
    });
    
    // Receiving JSON data from the client
    socket.on('dataFromClient', (clientData) => {
        console.log('Data received from client:', clientData);
    });

});


//Check http://localhost:3001/main
server.listen(3001, () => {
    console.log('Server is running on http://localhost:3001/main');

    //read first
    demandoutput();
});

app.get('/main', (req, res) => {
    res.sendFile(__dirname + '/dummy.html');
});


function demandoutput(){
    // Call the readoutput function from JsonHandler
    JsonHandler.readoutput((err, outjson) => {
        if (err) {
            // Handle errors here
            console.error('Error:', err);
        } else {
            // Use outputjson here
            outputjson = outjson;
            //console.log('Exported JSON data:', outputjson);
        }
    });
}