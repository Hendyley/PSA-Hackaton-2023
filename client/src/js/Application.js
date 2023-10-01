// Application.js
import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from "react-router-dom";

const Settings = () => {
    // see https://dev.to/novu/building-a-chat-app-with-socketio-and-react-2edj
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
  
    const sendMessage = (e) => {
      e.preventDefault();
      localStorage.setItem('userName', userName);
      navigate('/');
    };

    return (
        <div id="webapp-body">
            <div id="pagenav">
                <a className="title">PSA Hackathon 2023</a>
                <a className="tab"><Link to="/" className="inactive">Home</Link></a>
                <a className="tab"><Link to="/app" className="active">App</Link></a>
            </div>

            <div className="centered-content">
                <div className="main-body">
                    <button onClick={sendMessage}> submit </button>
                </div> 
            </div>
        </div>
    );
};

export default Settings;