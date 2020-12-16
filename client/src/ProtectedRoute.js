import React from 'react'
import {Route,Redirect} from 'react-router-dom'
import withAuth from './Components/withAuth'
 const ProtectedRoute = ({component: Component ,...rest}) =>{
    const auth = new withAuth();
    return(
        <Route
            {...rest}
            render = {props=>{
                if (auth.isAuthenticated){
                    return <Component {...props}/>
                }
                else{
                    return <Redirect to={
                        {
                            pathname:"/login",
                            state:{
                                from:props.location
                            }
                        }
                    }/>
                }
                
            }}
        ></Route>
    )
}
export default ProtectedRoute