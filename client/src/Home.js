import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Components/Header'
import './StyleSheets/Header.css'

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            homescreen:true
        }

    }
    componentDidMount(){
        // console.log("jhekek",this.props.showSideBar(this.state.homescreen))
        console.log('sasdasd',this.state.homescreen)
    }

    checkSideBar = (item) =>{
        this.setState({
            homescreen: item
        })
    }
    render(){
        console.log('home',this.state.homescreen)
        var divStyle = {
            pointerEvents: this.state.homescreen ? 'all': 'none',
        }
        return(
            <div className="home-main" >

                <Header data = {this.checkSideBar.bind(this)}/>
                
                <h2><span>Welcome to INVESCO!</span></h2>
                <div className="options" style={divStyle}>
                    <Link className="home-div-links" to="/RealEstatePrediction">
                        <div className="options-inside" onClick="3">
                            <h3>Stock Predictor</h3>
                            <p>Here you will be able to view stock companies of the KSE100 index. Select this to get more info..</p>
                        </div>
                    </Link>
                    <Link className="home-div-links" to="/RealEstatePrediction">
                        <div className="options-inside"> 
                            <h3>Real Estate Predictor</h3>
                            <p>Here you will be able to view areas in Islamabad. Select this to get more info..</p>
                        </div>
                    </Link>
                    <Link className="home-div-links" to="/RealEstatePrediction">
                        <div className="options-inside">
                            <h3>Investment Recommendation</h3>
                            <p>Our personal investment recommender. This will tell you where you need to invest right now!</p>
                        </div> 
                    </Link>
                </div>
            </div>
        );
    }   
}
export default Home;