import React from 'react';
import PropertyHeader from './Components/PropertyHeader'
import './StyleSheets/Header.css'
import './StyleSheets/RealEstateMainPage.css'
import RealEstateAreaSearchBar from './Components/RealEstateAreaSearchBar'
class RealEstateMain extends React.Component{
    render(){
        return(
            <div>
                <div><PropertyHeader/></div>
                <div className="realestate-main">
                    <h1>REAL ESTATE PRICE PREDICTOR</h1>
                </div>
                <RealEstateAreaSearchBar/>
                
            </div>
        );
    }
}
export default RealEstateMain;