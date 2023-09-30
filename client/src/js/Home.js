// Home.js
import React from "react"
import { Outlet, Link, useHistory } from "react-router-dom";

import descriptorText from "./Components";

import PSA from '../img/PSA.png';

const Home = () => {

    return (
        <div id="webapp-body">

            <div id="pagenav">
                <a className="title">
                    PSA Hackathon 2023
                </a>
                
                <a className="tab">
                    <Link to="/" className="active">Home</Link>
                </a>
                
                <a className="tab">
                    <Link to="/app" className="inactive">App</Link>
                </a>
            </div>

            <div id="sep"></div>



            <div className="main-body">
                <div className="centered-content">
                    <img src={PSA} id="PSA-img"></img>
                    
                    <div id="sep"></div>
                    
                    
                </div> 

                <div className="centered-text xlarge-text">
                    Team NewBies
                </div>

                <div id="sep"></div>

                <div className="centered-content">
                    <button id="start-button" onclick=""> 
                        START
                    </button>
                </div>

                <div id="sep"></div>

                <descriptorText />

                

            </div>

        </div>
    );
};

export default Home;