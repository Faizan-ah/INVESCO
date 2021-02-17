import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import { createLogger } from 'redux-logger';
import {Provider} from 'react-redux'

const initialUserState = {
  user: null,
  isAuth: false
}
const userReducer = (state = initialUserState , action)=>{
  switch(action.type){
      case 'nullUser':
          console.log('user null')
          state={
              ...state,
              user:null,
              isAuth:false    
          }
      case 'setUser':
          state = {
              ...state,
              user: action.payload,
              isAuth: true,
          }
          break
  }
  return state;
}


//personal logger
const myLogger  = (store) => (next) => (action) =>{
  console.log('logged action: ', action)
  next(action)
}

const store =  createStore(
  combineReducers({
      user: userReducer,
  }),
  {},
  compose(
      applyMiddleware(createLogger()),

  )
  
)

store.subscribe(()=>{
console.log('store updated!', store.getState())
})

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
