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

                    <div class="sep-top"></div>

                    <div className="centered-content">
                        <button id="start-button" onClick={handleClick}> 
                            Try it out!
                        </button>
                    </div>

                    <div class="sep-top sep-bot"></div>

                    <div className="padded">
                        <DescriptorText title = "The Problem" subtext="World domination, a perilous ambition, has captivated minds throughout history. The quest for global supremacy, often driven by power-hungry individuals or nations, raises profound ethical and geopolitical questions. It underscores the human desire for control, leading to conflicts, alliances, and a world in constant flux."/>
                    </div>
                    <div className="padded">
                        <div id="mission-values-grid">
                            <MinorDescriptorText title = "Our Aim" subtext="Taking over the world. Step by step. For a brighter future."/>
                            <MinorDescriptorText title = "Our Values" subtext="The willpower and determination to take over the world."/>
                        </div>
                    </div>

                    <div class="sep-top"></div>

                    <div className="padded">
                        <MinorDescriptorText title = "Our Plan" subtext="Our plan for world domination involves an army of rubber duckies and ticklish laughter rays. The world can't help but giggle at our ambition."/>
                    </div>
 
                    
                </div>
            </div>


        </div>
    );
};

export default Home;