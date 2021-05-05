import React, { Component } from 'react';
import '../StyleSheets/Header.css';
import { Link } from 'react-router-dom';
export class PropertyHeader extends Component {
    state = {
        data : ["SNGP: OHLC for today is O:200 H:320 L:212 C: 212",
            "PEL: OHLC for today is O:200 H:320 L:212 C: 212",
            "KAPCO: OHLC for today is O:200 H:320 L:212 C: 212",
            "KAPCO: OHLC for today is O:200 H:320 L:212 C: 212",
            "PEL: OHLC for today is O:200 H:320 L:212 C: 212",
            "KAPCO: OHLC for today is O:200 H:320 L:212 C: 212",
            "KAPCO: OHLC for today is O:200 H:320 L:212 C: 212"
            ]
    }

    render() {
        return (
            <div>
                <ul className="property-topbar">
                   <li><Link to="/Home">Home</Link></li>
                   {/* <li><Link onClick={this.handleClick}><NotificationsIcon/></Link></li> */}
               </ul>
            </div>
        )
    }
}

export default PropertyHeader
