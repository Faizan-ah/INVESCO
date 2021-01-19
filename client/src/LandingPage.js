import React from 'react';
import {Link} from 'react-router-dom'
import LandingPageHeader from './Components/LandingPageHeader'
import Footer from './Components/Footer'
import './StyleSheets/LandingPage.css'
import logo from "C:/Users/Faian/invvesco/client/src/StyleSheets/images/gra.jpg" 

class LandingPage extends React.Component{
    onClickLogin = ()=>{
        
    }
    render(){
        
        return(
            <div className="landing-page-main">
                <div>
                    <LandingPageHeader/>
                </div>
                <div className="landing-heading">
                    <div class='bg-curve'>
                        <div>
                            <h1>WELCOME TO INVESCO</h1>
                            <p className="intro-para">Want to invest but don't know where to? You've come to the right place!</p> 
                        </div>
                    </div>
                </div>
                <div className="landing-info">
                    <div className="landing-info-box">
                        <h2>Easy For Everyone</h2>
                        <div className="para">
                        <p>No technical skills required! No experience needed in stock or property investment. INVESCO provides access to strategies created by experts and all prices are predicted based on those strategies</p>
                        </div>
                    </div>
                    <div className="landing-info-box">
                        <h2>Best For Beginners</h2>
                        <div className="para">
                        <p>With the aid of the investment recommendation, INVESCO uses the already predicted data and provides an investment recommendation making it really easy for beginners to invest.</p>
                        </div>
                    </div>
                </div>
                <div className="landing-content">
                    <div className="intro">
                        <h1>What we provide</h1>
                        <h3>Stock Price Predictor</h3>
                        <p>Get predicted stock prices for the companies in the KSE100 index. Change your models and decide when and where to invest! </p>
                        <h3>Real Estate Price Predictor</h3>
                        <p>Looking for property investment? Our system provides predicted real estate prices in Islamabad.</p>
                        <h3>Investment Recommendation</h3>
                        <p>Don't know where to invest? Get a system recommendation and make your life easy!</p>
                    </div>
                    <div className="graph-image">
                        <img alt="image" src={logo} />
                    </div>
                </div>
                <div>
                    <Footer/>
                </div>
                
            </div>
        )
    }
}

export default LandingPage;