import React from 'react';
import {Link} from 'react-router-dom'
class LandingPage extends React.Component{
    onClickLogin = ()=>{
        
    }
    render(){
        return(
            <div className="landing-page-main">
                <h1>Landing Page</h1>
                <Link to="/login"><button>login</button></Link>
                <Link to="/registration"><button>signup</button></Link>
            </div>
        )
    }
}

export default LandingPage;