import React from 'react';
import axios from 'axios';
import Home from './Home';
import Signup from './Signup'
import Login from './Login'
import './StyleSheets/Home.css';
import RealEstateMain from './RealEstateMainPage'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LandingPage from "./LandingPage";
import ProtectedRoute from './ProtectedRoute'
//import Header from './Components/Header'
class App extends React.Component{
  //submiting form data
  submit = (event)=>{
    //stops rendering until submit button
    event.preventDefault();

    const payload = {
      name : "umer",
      age : "12"
    }

    //sending data to server
    axios({
      url:'/api/save',
      method:'POST',
      data: payload
    })
    .then(()=>{
      console.log("data sent to server")
      //this.resetUserInputs();
      //this.getBlogPost();
    })
    .catch(()=>{
      console.log("data NOT sent to server")
    })
  };

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
        </Router>
      </div>
    );
  }
} 
export default App;