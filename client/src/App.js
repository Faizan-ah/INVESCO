import React from "react";
import Home from "./Home";
import Signup from "./Signup";
import Login from "./Login";
import "./StyleSheets/Home.css";
import RealEstateMain from "./RealEstateMainPage";
import ChangeEmail from "./Components/ChangeEmail";
import ChangePassword from "./Components/ChangePassword";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "./LandingPage";

import { connect } from "react-redux";
import fire from "./config/fire";
import ForgotPassword from "./Components/ForgotPassword";
import StockMainPage from "./Components/StockMainPage";
import StockTable from "./Components/StockTable";
import DeleteAccount from "./Components/DeleteAccount";
import InvestmentRec from "./Components/InvestmentRec";
import TermsandConditions from "./Components/TermsandConditions";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user.user,
      isAuth: this.props.user.isAuth,
    };

    this.authListener = this.authListener.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
        this.props.confirmUserAuth(user);
      } else {
        this.setState({ user: null, isAuth: false });
      }
    });
  }
  render() {
    return (
      <div>
        <Router>
          <Route path="/" exact component={LandingPage} />
          <Route
            path="/Home"
            exact
            issAuth={this.props.setisAuth}
            component={Home}
          />
          <Route path="/registration" exact component={Signup} />
          <Route path="/login" exact component={Login} />
          <Route
            path="/RealEstatePrediction"
            component={RealEstateMain}
            exact
          />
          <Route path="/StockPrediction" component={StockMainPage} exact />
          <Route path="/ChangeEmail" component={ChangeEmail} exact />
          <Route path="/StockTable" component={StockTable} exact />
          <Route path="/ChangePassword" component={ChangePassword} exact />
          <Route path="/DeleteAccount" component={DeleteAccount} exact />
          <Route path="/ForgotPassword" component={ForgotPassword} exact />
          <Route
            path="/InvestmentReccomendation"
            component={InvestmentRec}
            exact
          />

          <Route
            path="/TermsandConditions"
            component={TermsandConditions}
            exact
          />
        </Router>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    //initialUserState
    user: state.user,
    // math: state.mathReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    confirmUserAuth: (user) => {
      dispatch({
        type: "setUser",
        payload: user,
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
