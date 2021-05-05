import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer'
import './StyleSheets/Header.css'
import CarouselPage from './Components/Slider'

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import stockpic from './StyleSheets/images/business-finance-terms-and-definitions-1-2.jpg'
import investpic from './StyleSheets/images/image.img.450.225.20191016091944.jpg'
import propertypic from './StyleSheets/images/Property-Investment-Tips.jpg'
import introStockPic from "./StyleSheets/images/home-stock-prediction-intro.jpg";
import introPropertyPic from "./StyleSheets/images/home-property-prediction-intro.jpg";
import introIRPic from "./StyleSheets/images/home-IR-intro.jpg";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import WOW from 'wowjs';
import Login from './Login'
import './StyleSheets/Footer.css'
import { connect } from 'react-redux';
import fire from './config/fire';
import './StyleSheets/Header.css'



import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import clsx from 'clsx';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import StockTable from './Components/StockTable'



const theme = createMuiTheme({
  
});


const useStyles = (theme) => ({
    root: {
      maxWidth: 345,
    //   float:'left',
    //   marginLeft: '180px',
    //   marginTop: 200,
    //   border : '2px solid black',
      minHeight: '300px',
      borderRadius:'10px',
      [theme.breakpoints.down('xs')]:{
          marginLeft:'70px',
          width: '100%'
      },
      [theme.breakpoints.up('sm')]:{
         
          width: '100%'
      }
    },
    homeContent: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flexWrap:'wrap',
        //   float:'left',
          width:'100%',
          marginLeft:'auto',
          marginRight:'auto',
          alignContent:'center',
          paddingTop:40
        //   backgroundColor:'grey',
        //   paddingBottom: 50,
        //   border: '1px solid black'
    },
    picii : {
        '&:hover':{
            backgroundColor: '#7BC7F9',
            transition: '1000ms',
            opacity: 0.8,
        }
    },
    btn:{
        paddingRight:'20px',
        // border : '2px solid black',
        '&:hover':{
          backgroundColor: '#7BC7F9',
          transition: '1000ms',
        }
    }
  });
  
class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            homescreen:true,
            sidebar:false,
            right: false,
        }
        this.checkSide = this.checkSide.bind(this)
    }

    toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        this.setState({ ...this.state, [anchor]: open });
      };

      
    componentDidMount(){
        console.log('sasdasd',this.state.homescreen)
        new WOW.WOW().init();   
    }
    
    checkSideBar = (item) =>{
        this.setState({
            homescreen: item,
        })
    }
    checkSide = (childValue) =>{
        this.setState({
            sidebar:childValue
        })
    } 
    

      

    render(){
        const {classes} = this.props;

        console.log('home',this.state.homescreen)
        var divStyle = {
            pointerEvents: this.state.homescreen ? 'all': 'none',
            // width: this.state.homescreen ? '100%': '90%',
        }

        const isAuthenticated = this.props.user.isAuth;
        console.log('in home auth', isAuthenticated)

        const user = fire.auth().currentUser
        console.log('in home class sidebar', this.state.sidebar)
        console.log('in home class homescren', this.state.homescreen)


        if(!isAuthenticated){
            return(
                <Login/>
            )
        }else{
            return(
                // ()=>{
                //     this.setState({
                //     homescreen:!this.state.homescreen,
                //     sidebar : !this.state.sidebar
                // })}
                <div>    
                    {/*############################################## Header ############################################## */}
                    <Header data = {this.checkSideBar.bind(this)} dataSide = {this.checkSide.bind(this)}/>
                    
                    {/*############################################## Slider ############################################## */}
                    <div>
                        <CarouselPage />
                    </div>
                        <div className="home-main">
                            {/* <div className='home-main-heading wow pulse' data-wow-duration="2" data-wow-iteration="3" data-wow-offset="30" data-wow-duration="1.7s">
                                <h2><span>Welcome to INVESCO!</span></h2>
                            </div> */}
                            <div className='home-main-heading' data-wow-duration="2" data-wow-iteration="3" data-wow-offset="30" data-wow-duration="1.7s">
                                <h2><span>Welcome to INVESCO!</span></h2>
                            </div>
                        {/*############################################## CARDS ############################################## */}
                        
                        <div>
                            <div className={classes.homeContent}>
                                <Card id ='stockCard' className={classes.root}>
                                    <CardActionArea onClick={()=> this.props.history.push('/StockTable')} className={classes.picii}>
                                        <CardMedia
                                            style={{height: 200}}
                                            component="img"
                                            alt="Stock Predictor"
                                            height="140"
                                            image={stockpic}
                                            title="Stock Predictor"
                                            />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                Stock Price Predictor
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                            Here you will be able to view stock companies of the KSE100 index.
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Button className={classes.btn} onClick={()=> this.props.history.push('/StockTable')}  size="small" color="primary">
                                            Go
                                        </Button>
                                        <Button className={classes.btn} size="small" color="primary" >
                                            Learn More
                                        </Button>
                                    </CardActions>
                                </Card>
    
                                <Card id ='propertyCard' className={classes.root}>
                                    <CardActionArea onClick={()=> this.props.history.push('/RealEstatePrediction')} className={classes.picii}>
                                        <CardMedia
                                        style={{height: 200,width:350}}
                                        component="img"
                                        alt="RealEstate Predictor"
                                        height="140"
                                        image={propertypic}
                                        title="RealEstate Predictor"
                                        />
                                        <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Real-Estate Price Predictor
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            Here you will be able to view areas in Islamabad and decide which areas to invest into.
                                        </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Button className={classes.btn} onClick={()=> this.props.history.push('/RealEstatePrediction')} size="small" color="primary">
                                            Go
                                        </Button>
                                        <Button className={classes.btn} size="small" color="primary">
                                            Learn More
                                        </Button>
                                    </CardActions>
                                </Card>
                                <Card id ='IRCard' className={classes.root}>
                                    <CardActionArea onClick={()=> this.props.history.push('/InvestmentReccomendation')} className={classes.picii}>
                                        <CardMedia
                                        style={{height: 200,}}
                                        component="img"
                                        alt="Investment Recommendation"
                                        height="140"
                                        image={investpic}
                                        title="Investment Recommendation"
                                        />
                                        <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                        Investment Recommendation
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                        Our personal investment recommender. This will tell you where you need to invest right now!
                                        </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions >
                                        <Button className={classes.btn} onClick={()=> this.props.history.push('/InvestmentReccomendation')} size="small" color="primary">
                                        Go
                                        </Button>
                                        <Button className={classes.btn} size="small" color="primary">
                                        Learn More
                                        </Button>
                                    </CardActions>
                                </Card>
                                
                                </div>
                            </div>
                            
                        </div>

                        {/*############################################## HOME INTRO ############################################## */}
                        <div className='home-intro'>
                            <div className='home-intro-stock'>                           
                                <div className='wow slideInLeft' data-wow-duration="1" data-wow-offset="100" data-wow-duration="1.7s">
                                    <img src={introStockPic}></img>
                                </div>
                                <div className='home-intro-stock-content'>
                                    <div className='home-intro-stock-content-heading'>
                                        <h2 ><span><a href="#stockCard">Stock Predictor</a></span></h2>
                                    </div>
                                    <div id='stockinfo' className='home-intro-stock-content-para wow fadeIn' data-wow-duration="1" data-wow-offset="100" data-wow-duration="5s"> 
                                        <p>Our Stock Predictor permits to show a few specialized markers for a solitary index on a similar graph. 
                                            Our predictor utilizes multiple algorithms and techniques to predict the future stock prices.
                                            Our newest options are the alert and subscribe options, where you can add alerts to a company when its stock reaches a specific point. 
                                            Also subscribe to companies in which you are interested in to get notifications.</p>
                                    </div>
                                </div>
                            </div>
    
                            <div className='home-intro-property'>
                                <div className='wow slideInRight' data-wow-duration="1" data-wow-offset="140" data-wow-duration="1.7s">
                                    <img src={introPropertyPic}></img>
                                </div>
                                <div className='home-intro-property-content'>
                                    <div className='home-intro-property-content-heading'>
                                        <h2 id='propertyinfo'><span><a href="#propertyCard">Property Predictor</a></span></h2>
                                    </div>
                                    <div className='home-intro-property-content-para wow fadeIn' data-wow-duration="1" data-wow-offset="140" data-wow-duration="5s"> 
                                        <p>
                                            Find out where to invest in islamabad if you are interested in real-estate investment.
                                            Our real-estate price predictor covers all areas in Islamabad and will tell you the average price per Marla or Kanal.
                                            Alert and Subscribe options are also available in real-estate investment!
                                        </p>
                                    </div>
                                </div>
                            </div>
    
                            <div className='home-intro-stock'>
                                <div className='wow slideInLeft' data-wow-duration="1" data-wow-offset="180" data-wow-duration="1.7s">
                                    <img src={introIRPic}></img>
                                </div>
                                <div className='home-intro-stock-content'>
                                    <div className='home-intro-stock-content-heading'>
                                        <h2><span><a href="#IRCard">Investment Recommendation</a></span></h2>
                                    </div>
                                    <div className='home-intro-stock-content-para wow fadeIn' data-wow-duration="1" data-wow-offset="180" data-wow-duration="5s"> 
                                        <p>
                                            This system was made keeping in mind the fact that not everyone has the technical skills to predict future prices.
                                            Whether they be stock or real-estate. Our system provides users an investment recommendation based on their interests.
                                            Just some basic knowledge and you are good to go!  
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div style={{backgroundColor:'white',color:'white'}}>.</div>
                        </div>
                        <div>
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
                                        <Link>Terms and Conditions</Link>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        
                </div>
               
        
                
            );
        }
        
    }   
}
const mapStateToProps = (state)=>{
    return {
      //initialUserState 
      user: state.user,
      // math: state.mathReducer
    }
  }
export default connect(mapStateToProps)(withStyles(useStyles)(Home));