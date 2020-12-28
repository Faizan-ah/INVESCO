import React from 'react';
import Home from './Home';
import Signup from './Signup'
import Login from './Login'
import './StyleSheets/Home.css';
import RealEstateMain from './RealEstateMainPage';
import RealEstateAreaSearchBar from './Components/RealEstateAreaSearchBar'
import { BrowserRouter as Router, Route , Switch} from 'react-router-dom';
import LandingPage from "./LandingPage";
// import ProtectedRoute from './ProtectedRoute'
//import Header from './Components/Header'
class App extends React.Component{
  render(){
    return(
      <div>
        {/*<button onClick={this.submit}>submit</button>*/}
        {/*use Switch instead of router*/}
        <Router> 
          <Route path="/" exact component={LandingPage}/>
          <Route path="/Home" exact component={Home}/>
          {/* <ProtectedRoute path="/Home"></ProtectedRoute> */}
          <Route path="/registration" exact component={Signup}/>
          <Route path="/login" exact component={Login}/>
          {/*<Route path="/" exact component={Header}/>*/}
          <Route path = "/RealEstatePrediction" component={RealEstateMain} exact/>
          {/* <Route path = "/search" component={RealEstateAreaSearchBar} exact/> */}
        </Router>
      </div>
    );
  }
} 
export default App;