// Home.js
import React from "react";
import { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";

import DescriptorText from "./DescriptorText";
import MinorDescriptorText from "./MinorDescriptorText";
import '../css/home.css';

import PSA from '../img/PSA.png';
import Hendy from '../img/Hendy.jpg';
import Weiyang from '../img/Weiyang.jpg';
import Eechern from '../img/Eechern.jpg';


const Home = () => {
    const navigate = useNavigate();

    function handleClick() {
        navigate('/app');
      }

    return (
        <div id="webapp-body">

            <div id="pagenav">
                <a className="title">PSA Hackathon 2023</a>
                <a className="tab"><Link to="/" className="active">Home</Link></a>
                <a className="tab"><Link to="/app" className="inactive">App</Link></a>
            </div>


            <div className="centered-content">
                <div className="main-body">
                    <div className="centered-content">
                        <img src={PSA} id="PSA-img"></img>
                        
                        <div class="sep-top"></div>
                        
                        
                    </div> 

                    <div className="centered-text xlarge-text">
                        Team NewBies
                    </div>

                    <div id="member-grid">
                        <div className="padded"> 
                            <div className="content-box">
                                <div className="descriptor-text-div">
                                    <div id="descriptor-text-title">
                                        <div className="centered-content">
                                            <img src={Weiyang} id="pfp"></img>
                                        </div>
                                    </div>
                                    <div className="centered-text">
                                        Wei Yang
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="padded"> 
                            <div className="content-box">
                                <div className="descriptor-text-div">
                                    <div id="descriptor-text-title">
                                        <div className="centered-content">
                                            <img src={Hendy} id="pfp"></img>
                                        </div>
                                    </div>
                                    <div className="centered-text">
                                        Hendy
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="padded"> 
                            <div className="content-box">
                                <div className="descriptor-text-div">
                                    <div id="descriptor-text-title">
                                        <div className="centered-content">
                                            <img src={Eechern} id="pfp"></img>
                                        </div>
                                    </div>
                                    <div className="centered-text">
                                        Ee Chern
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="sep-top"></div>

                    <div className="centered-content">
                        <button id="start-button" onClick={handleClick}> 
                            Try it out!
                        </button>
                    </div>

                    <div className="sep-top sep-bot"></div>

                <div className="centered-content">
                    <div id="remaining-page">
                        <div className="padded">
                            <DescriptorText
                                title="Theme 1: Towards a highly resilient Port Ecosystem"
                                subtext={String.raw`
                                    Demand-supply management within the container port ecosystem is crucial for its efficiency. 
                                    Firstly, forecasting demand is essential, considering factors like shipping schedules, trade fluctuations, and seasonal variations. 
                                    Secondly, managing the supply of available berths and terminal facilities is vital to handle incoming vessels and cargo. 
                                    Thirdly, optimizing the allocation of resources, such as cranes and handling equipment, ensures smooth operations. 
                                    Effective demand-supply management helps reduce congestion, minimize vessel waiting times, maximize asset utilization, and enhance the overall throughput of the port. 
                                    Striking the right balance between supply and demand is pivotal in maintaining the productivity and competitiveness of container ports. 
                                `}
                            />
                        </div>
                        <div className="padded">
                            <div id="mission-values-grid">
                                <MinorDescriptorText 
                                    title = "Our Aim" 
                                    subtext="
                                        Powering our future using technology and data.
                                "/>
                                <MinorDescriptorText 
                                    title = "Our Values" 
                                    subtext="
                                        Technology and optimisation for sustainability and efficiency.
                                "/>
                            </div>
                        </div>

                        <div className="sep-top"></div>

                        <div className="padded">
                            <MinorDescriptorText title = "Our Plan" subtext="Using ML and AI on container spatial characteristics to determine optimal placing. Our intention is to optimise the space utilisation (demand and supply) for container stacking"/>
                        </div>
                    </div>
                </div>
                    <div className="sep-top"></div>
                </div>

            </div>


        </div>
    );
};

export default Home;