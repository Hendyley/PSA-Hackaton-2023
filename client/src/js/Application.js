// Settings.tsx
import React from "react";
import { Outlet, Link } from "react-router-dom";

const Settings = () => {
    return (
        <div id="webapp-body">
            <div id="pagenav">
                <a className="title">PSA Hackathon 2023</a>
                <a className="tab"><Link to="/" className="inactive">Home</Link></a>
                <a className="tab"><Link to="/app" className="active">App</Link></a>
            </div>

            <div className="centered-content">
                <div className="main-body">

                </div> 
            </div>
        </div>
    );
};

export default Settings;