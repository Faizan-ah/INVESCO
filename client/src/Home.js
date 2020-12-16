import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Components/Header'
import './StyleSheets/Header.css'
import withAuth from './Components/withAuth'
class Home extends React.Component{
    render(){
        const auth = new withAuth();
        return(
            <div className="home-main">
                <Header/>
                <h2><span>Welcome to INVESCO!</span></h2>
                <div className="options">
                    <div className="options-inside" onClick="3">
                        <h3>Stock Predictor</h3>
                        <p>Here you will be able to view stock companies of the KSE100 index. Select this to get more info..</p>
                    </div>
                    <Link className="home-div-links" to="/RealEstatePrediction">
                        <div className="options-inside"> 
                            <h3>Real Estate Predictor</h3>
                            <p>Here you will be able to view areas in Islamabad. Select this to get more info..</p>
                        </div>
                    </Link>
                    <div className="options-inside">
                        <h3>Investment Recommendation</h3>
                        <p>Our personal investment recommender. This will tell you where you need to invest right now!</p>
                    </div> 
                </div>
                <button onClick={()=>{
                    this.props.history.push('/LandingPage')
                }}>logout</button>
            </div>
        );
    }   
}
export default Home;