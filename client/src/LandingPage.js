import React from 'react';
import {Link} from 'react-router-dom'
import LandingPageHeader from './Components/LandingPageHeader'
import Footer from './Components/Footer'
import './StyleSheets/LandingPage.css'
import logo from "./StyleSheets/images/gra.jpg" 
import WOW from 'wowjs';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import femaleImg1 from './StyleSheets/images/female-avatar-12-774634.png'
import femaleImg2 from './StyleSheets/images/female-avatar-2.png'
import maleImg1 from './StyleSheets/images/male-avatar-1.png'
import maleImg2 from './StyleSheets/images/male-avatar-2.png'
import * as RiIcon from 'react-icons/ri'
import * as GiIcon from 'react-icons/gi'
import * as FaIcon from 'react-icons/fa'
const useStyles = ((theme) => ({
    large: {
      width: theme.spacing(9),
      height: theme.spacing(9),
    },
  }));
  
class LandingPage extends React.Component{
    onClickLogin = ()=>{
        
    }
    componentDidMount(){
        new WOW.WOW().init();
    }
    render(){
        const {classes} = this.props
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
                    <div className="landing-info-box wow bounceInLeft" data-wow-duration="1.8s">
                        <h2>Easy For Everyone</h2>
                        <div className="para">
                            <p>No technical skills required! No experience needed in stock or property investment. INVESCO provides access to strategies created by experts and all prices are predicted based on those strategies</p>
                        </div>
                    </div>
                    <div className="landing-info-box wow bounceInRight" data-wow-duration="1.8s">
                        <h2>Best For Beginners</h2>
                        <div className="para">
                            <p>With the aid of the investment recommendation, INVESCO uses the already predicted data and provides an investment recommendation making it really easy for beginners to invest.</p>
                        </div>
                    </div>
                </div>
                
                <div className="landing-content">
                    <div className="graph-image">
                        <img alt="image" src={logo} />
                    </div>
                    <div className='landing-content-stuff'>
                        <div className='landing-content-heading'>
                            <h1> What we provide</h1>
                        </div>
                        <div className="intro">
                            <div className='intro-timeline'>
                                <div className='intro-timeline-box'>
                                    <div className='intro-timeline-box-circle'>
                                        <RiIcon.RiStockFill/>
                                    </div>
                                </div>
                                <div className='intro-timeline-box-line'>

                                </div>
                                <div className='intro-timeline-box'>
                                    <div className='intro-timeline-box-circle'>
                                        <GiIcon.GiHouse/>
                                    </div>
                                </div>
                                <div className='intro-timeline-box-line'>
                                                                    
                                </div>
                                <div className='intro-timeline-box'>
                                    <div className='intro-timeline-box-circle'>
                                        <FaIcon.FaHandHoldingUsd/>
                                    </div>
                                </div>
                            </div>
                            <div className='intro-timeline-content'>
                                <div>
                                    <h3>Stock Price Predictor</h3>
                                    <p>Get predicted stock prices for the companies in the KSE100 index. Change your models and decide when and where to invest! </p>
                                </div>
                                <div>
                                    <h3>Real Estate Price Predictor</h3>
                                    <p>Looking for property investment? Our system provides predicted real estate prices in Islamabad.</p>    
                                </div>
                                <div>
                                    <h3>Investment Recommendation</h3>
                                    <p>Don't know where to invest? Get a system recommendation and make your life easy!</p>
                                </div>
                            </div>   
                        </div>
                    </div>
                    
                    
                </div>
                <div className='spacer'>
                    <span></span>
                </div>
                <div className='detail-row'>
                    <div className='detail-box'>
                        <p className='numbers'>2K+</p>
                        <p className='numbers-label'>Global Users</p>
                    </div>
                    <div className='detail-box'>
                        <p className='numbers'>100+</p>
                        <p className='numbers-label'>Areas</p>
                    </div>
                    <div className='detail-box'>
                        <p className='numbers'>99+</p>
                        <p className='numbers-label'>Stock Companies</p>
                    </div>
                </div>
                <div className='testimonials'>
                    <div className='testimonials-intro'>
                        <h2><span>Testimonials</span></h2>
                        <h3>What Our Clients Say</h3>
                    </div>
                    <div class="slider">
                        <input type="radio" name="slider" title="slide1" class="slider__nav"/>
                        <input type="radio" name="slider" title="slide2" class="slider__nav"/>
                        <input type="radio" name="slider" title="slide3" class="slider__nav"/>
                        <input type="radio" name="slider" title="slide4" class="slider__nav"/>
                        <div class="slider__inner">
                            <div class="slider__contents">
                            <Avatar alt="Justin Sharp" src={maleImg2} className={classes.large}/>
                            <h2 class="slider__caption">Justin Sharp</h2>
                            <p class="slider__txt">"You won't regret it. I have gotten at least 50 times the value from investment."</p>
                            </div>
                            <div class="slider__contents">
                            <Avatar alt="Travis Howard" src={maleImg1} className={classes.large}/>
      
                            <h2 class="slider__caption">Travis Howard</h2>
                            <p class="slider__txt">"INVESCO has got everything I need. Best. Plaform. Ever! It did exactly what you said it does. I would also like to say thank you to all your staff."</p>
                            </div>
                            <div class="slider__contents">
                            <Avatar alt="Cindy Joe" src={femaleImg1} className={classes.large}/>
                            <h2 class="slider__caption">Cindy Joe</h2>
                            <p class="slider__txt">"Keep up the excellent work. I just can't get enough of this!"</p>
                            </div>
                            <div class="slider__contents">
                            <Avatar alt="Hannah Baker" src={femaleImg2} className={classes.large}/>
                            <h2 class="slider__caption">Hannah Baker</h2>
                            <p class="slider__txt">"Absolutely wonderful! This has impressed me on multiple levels. Thanks INVESCO!"</p>
                            </div>
                        </div>
                    </div>
                    
                   
                </div>
                <div>
                    <Footer/>
                </div>
                
            </div>
        )
    }
}

export default withStyles(useStyles)(LandingPage);