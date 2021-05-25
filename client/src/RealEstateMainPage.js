import React from 'react';
import PropertyHeader from './Components/PropertyHeader'
import './StyleSheets/Header.css'
import './StyleSheets/RealEstateMainPage.css'
import RealEstateAreaSearchBar from './Components/RealEstateAreaSearchBar'
import HomePlotMenu from './Components/HomePlotMenu'
import Header from './Components/Header'
import { connect } from 'react-redux';
import { Login } from './Login';
class RealEstateMain extends React.Component{

    render(){
        const isAuthenticated = this.props.user.isAuth
        if(!isAuthenticated){
            return(
                <Login/>
            )
        }else{
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
}
const mapStateToProps = (state)=>{
    return {
        user: state.user,
      stock: state.stock,
    }
  }
export default connect(mapStateToProps)(RealEstateMain)
// export default RealEstateMain;