import React from 'react';
import Home from './Home';
import Signup from './Signup'
import Login from './Login'
import './StyleSheets/Home.css';
import RealEstateMain from './RealEstateMainPage';
import ChangeEmail from './Components/ChangeEmail';
import ChangePassword from './Components/ChangePassword';
import RealEstateAreaSearchBar from './Components/RealEstateAreaSearchBar'
import { BrowserRouter as Router, Route , Switch} from 'react-router-dom';
import LandingPage from "./LandingPage";

import { connect } from 'react-redux';
import fire from './config/fire'
import ForgotPassword from './Components/ForgotPassword';
// import ProtectedRoute from './ProtectedRoute'
//import Header from './Components/Header'
class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user.user,
      isAuth: this.props.user.isAuth
    };
    
    this.authListener = this.authListener.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('asdasdasd')
        this.setState({ user });
        this.props.confirmUserAuth(user)
      } else {
        console.log('here mf')
        // this.setState({ user: null,isAuth:false });
      }
    })
  }
  render(){
    return(
      <div>
      
        <Router> 
          <Route path="/" exact component={LandingPage}/>
          <Route path="/Home" exact issAuth={this.props.setisAuth} component={Home}/>
          <Route path="/registration" exact component={Signup}/>
          <Route path="/login" exact component={Login}/>
          <Route path = "/RealEstatePrediction" component={RealEstateMain} exact/>
          <Route path = "/ChangeEmail" component={ChangeEmail} exact/>
          <Route path = "/ChangePassword" component={ChangePassword} exact/>
          <Route path = "/ForgotPassword" component={ForgotPassword} exact/>
        </Router>
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

const mapDispatchToProps = (dispatch)=>{
  return {
    confirmUserAuth: (user)=>{
      console.log('in confirm user')
      dispatch({
        type: 'setUser',
        payload: user
      })
    }
    // ,
    // returnNullUser: (user)=>{
    //   console.log('in null user')
    //   dispatch({
    //     type: 'nullUser',
    //     payload: null
    //   })
    // }
  }

} 
export default connect(mapStateToProps,mapDispatchToProps)(App)