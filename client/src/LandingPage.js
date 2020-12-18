import React from 'react';
import {Link} from 'react-router-dom'
import LandingPageHeader from './Components/LandingPageHeader'
import './StyleSheets/LandingPage.css'

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
                    <h1>WELCOME TO INVESCO</h1>
                </div>
            </div>
        )
    }
}

export default LandingPage;