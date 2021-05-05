import React from 'react';
import PropertyHeader from './Components/PropertyHeader'
import './StyleSheets/Header.css'
import './StyleSheets/RealEstateMainPage.css'
import RealEstateAreaSearchBar from './Components/RealEstateAreaSearchBar'
import HomePlotMenu from './Components/HomePlotMenu'
import Header from './Components/Header'
import { connect } from 'react-redux';
class RealEstateMain extends React.Component{
    render(){
        return(
            <div>
                <div><Header/></div>
                <div className="realestate-main">
                    <h1>REAL ESTATE PRICE PREDICTOR</h1>
                </div>
                {/* <RealEstateAreaSearchBar/> */}
                <HomePlotMenu/>
            </div>
        );
    }
}
const mapStateToProps = (state)=>{
    return {
      //initialUserState 
      user: state.user,
      // math: state.mathReducer
    }
  }
export default connect(mapStateToProps)(RealEstateMain)
// export default RealEstateMain;