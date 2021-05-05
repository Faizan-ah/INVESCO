import React, { Component } from 'react'
import PropertyHeader from './PropertyHeader'
import Header from './Header'
import Paper from '@material-ui/core/Paper';
import '../StyleSheets/History.css'
export class History extends Component {
    render() {
        return (
            <div>
                <div><Header/></div>
                <div className="realestate-main">
                    <h1>HISTORY</h1>
                </div>
                <div>
                <Paper elevation={7}>
                    <div className='history-element'>
                        <div className='history-element-text'>
                            this was recomended at this time so dummy text this is.
                        </div>
                    </div>
                    <div className='history-element'>
                        <div className='history-element-text'>
                            this was recomended at this time so dummy text this is.
                        </div>
                    </div>
                    <div className='history-element'>
                        <div className='history-element-text'>
                            this was recomended at this time so dummy text this is.
                        </div>
                    </div>
                </Paper>
                

                </div>
            </div>
        )
    }
}

export default History
