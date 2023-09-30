//This is the main backend part

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

//Refering to other custom module
const JsonHandler = require('./JsonHandler');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

//variable
outputjson = {};

app.get('/main', (req, res) => {
    res.sendFile(__dirname + '/dummy.html');
});

io.on('connection', (socket) => {
   // console.log('A user connected');

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
        socket.emit('dataFromServer', outputjson);
    });
    
    // Receiving JSON data from the client
    socket.on('dataFromClient', (clientData) => {
        console.log('Data received from client:', clientData);
    });    

});


//Check http://localhost:3000/main
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000/main');

    //read first
    demandoutput();
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