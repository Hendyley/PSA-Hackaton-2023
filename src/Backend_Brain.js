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

const { exec } = require('child_process');

const pythonScriptPath = 'SmartSystemAllocation/Prototype_newbie.py';



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

    socket.on('Send_update_command', () => {
        exec(`python ${pythonScriptPath}`, (error, stdout, stderr) => {
            if (error) {
              console.error(`Error: ${error.message}`);
              return;
            }
          
            if (stderr) {
              console.error(`stderr: ${stderr}`);
              return;
            }
          
            const pythonOutput = stdout.trim(); // Trim any leading/trailing whitespace
          
            console.log(`Python script output: ${pythonOutput}`);
          
            // Now you can use 'pythonOutput' in your Node.js code
            // For example, you can pass it to another function or process it as needed
            // You can also return it from this script if needed
          });
        console.log("Python file run!");
    })

    // Sending JSON data to the client
    socket.on('Demand_latest_output', () => {
        // demandoutput();
        console.log("Output Json Before = "+outputjson);
  

        
          demandoutput();
          console.log("Output Json After = "+outputjson);
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