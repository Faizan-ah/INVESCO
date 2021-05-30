import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import '../StyleSheets/Footer.css'
export class Footer extends Component {
    render() {
        return (
            <div>
                {/* <div className="footer-space">
                    <span></span>
                </div> */}
                <div className="footer-body">
                    <div className="footer-title">
                        <h1>INVESCO</h1>
                    </div>
                    <div className="footer-content">
                        <div className="contact-us">
                            <h2>Contact Us</h2>
                            <p>Phone : +92324-6096102</p>
                            <p>Email : invescoDev@invesco.com</p>
                        </div>
                        <div className="footer-web-info">
                            <p>INVESCO is a system helping beginners to invest in stock and real estate.</p>
                        </div>
                        <div className="footer-links">
                            <Link to='/TermsandConditions'>Terms and Conditions</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer
