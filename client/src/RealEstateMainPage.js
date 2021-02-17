import React from 'react';
import PropertyHeader from './Components/PropertyHeader'
import './StyleSheets/Header.css'
import './StyleSheets/RealEstateMainPage.css'
import RealEstateAreaSearchBar from './Components/RealEstateAreaSearchBar'
import HomePlotMenu from './Components/HomePlotMenu'
class RealEstateMain extends React.Component{
    render(){
        return(
            <div>
                <div><PropertyHeader/></div>
                <div className="realestate-main">
                    <h1>REAL ESTATE PRICE PREDICTOR</h1>
                </div>
                {/* <RealEstateAreaSearchBar/> */}
                <HomePlotMenu/>
            </div>
        );
    }
}
export default RealEstateMain;