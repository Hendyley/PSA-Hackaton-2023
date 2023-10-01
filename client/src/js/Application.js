// Application.js
import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate } from "react-router-dom";
import socketIO from 'socket.io-client';

import '../css/application.css';
import TableComponent from './TableComponent';


const socket = socketIO.connect('http://localhost:3001');

const Application = () => {  
    const sendMessage = (e) => {
      socket.emit('Demand_latest_output');
    };

    const sendUpdateCommand = (e) => {
        socket.emit('Send_update_command');
      };

    const [jsonData, setMessageReceived] = useState([
        {
            "ContainerId": 8, 
            "Position": "(3, 9, 0)", 
            "Weight": 4, 
            "LoadingDate": "2023-10-01"
        },
        {
            "ContainerId": 11, 
            "Position": "(5, 8, 0)", 
            "Weight": 4, 
            "LoadingDate": "2023-10-01"
        },
      ]);

    console.log(typeof(jsonData));

    useEffect(() => {
        socket.on("dataFromServer", (data) => {
            console.log(data["containers"]);
            setMessageReceived(data["containers"]);
        })
    }, [socket]);

    return (
        <div id="webapp-body">
            <div id="pagenav">
                <a className="title">PSA Hackathon 2023</a>
                <a className="tab"><Link to="/" className="inactive">Home</Link></a>
                <a className="tab"><Link to="/app" className="active">App</Link></a>
            </div>

            <div className="centered-content">
                <div className="main-body">
                    <div className="centered-content sep-top">
                        <div>
                            <button onClick={sendMessage} id="application-button"> Receive </button>                    
                        </div> 
                        <div>
                            <button onClick={sendUpdateCommand} id="application-button"> Update Python </button>                    
                        </div> 
                    </div>
                    <h1 className='centered-text'>Message Received: </h1>
                    <div className ='centered-content'>
                        <div className='content-box' id='data-table-box'>
                            {/* <div className='centered-text'>{messageReceived}</div>      */}
                            <h1 className='centered-text' id="data-table-title">JSON Data Table</h1>
                            <TableComponent data={jsonData} />                   
                        </div>
                    </div>
                        


                    
                </div> 
            </div>
        </div>
    );
};

export default Application;