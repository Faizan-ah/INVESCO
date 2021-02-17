import React, { Component } from 'react';
import '../StyleSheets/Header.css';
import { Link } from 'react-router-dom';
export class PropertyHeader extends Component {
    static propTypes = {

    }

    render() {
        return (
            <div>
                <ul className="property-topbar">
                   <li><Link to="/Home">Home</Link></li>
                   <li><Link to="/news">News</Link></li>
                   <li><Link to="/contact">Contact</Link></li>
               </ul>
            </div>
        )
    }
}

export default PropertyHeader
