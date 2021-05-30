import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./StyleSheets/Login.css";
import { connect } from "react-redux";
import fire from "./config/fire";
export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      success: false,
      signInEmail: "",
      signInPassword: "",
      inputError: "",
    };
  }

  resetInputs = () => {
    this.setState({
      isLoading: false,
      signInEmail: "",
      signInPassword: "",
    });
  };

  onChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value,
    });
  };

  onSignin = () => {
    const { signInEmail, signInPassword } = this.state;

    fire
      .auth()
      .signInWithEmailAndPassword(signInEmail, signInPassword)
      .then((u) => {
        const user = fire.auth().currentUser;
        localStorage.setItem("uid", user.uid);
        if (user.emailVerified) {
          this.props.history.push("/home");
        } else {
          this.setState({
            inputError:
              "Email not verified. Please check your email for verification.",
          });
          fire.auth().signOut();
        }
      })
      .catch((err) => {
        this.setState({
          inputError: err.toString(),
        });
      });
  };

  render(props) {
    return (
      <div className="asdasd">
        <div class="login-main">
          <form method="post" class="loginForm">
            <div class="loginData">
              <h1 style={{ fontStyle: "normal", marginTop: "0px" }}>Welcome</h1>
              <div className="loginInputs">
                <label for="email">Email</label>
                <input
                  type="email"
                  name="signInEmail"
                  value={this.state.signInEmail}
                  id="email"
                  onChange={this.onChange}
                  required
                ></input>
                <label for="password">Password</label>
                <input
                  type="password"
                  name="signInPassword"
                  value={this.state.signInPassword}
                  id="password"
                  onChange={this.onChange}
                  required
                ></input>
              </div>
              <div className="error-display-login">
                <span>{this.state.inputError}</span>
              </div>

              <div>
                <div class="button" id="button-login" onClick={this.onSignin}>
                  <div id="circle"></div>
                  <p>LOGIN</p>
                </div>
              </div>
              <div class="links">
                <Link id="fpass" to="/ForgotPassword">
                  Forgot Password?
                </Link>
                <Link id="regAcc" to="/registration">
                  Register Account
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    //initialUserState
    user: state.user,
  };
};
export default connect(mapStateToProps)(withRouter(Login));
