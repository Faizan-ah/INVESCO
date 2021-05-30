import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";
import stockpic from "../StyleSheets/images/business-finance-terms-and-definitions-1-2.jpg";
// import begginerpic from 'C:/Users/Faian/invvesco/client/src/StyleSheets/images/begginer.jpg'
import begginerpic from "../StyleSheets/images/easy.jpg";
import prosliderpic from "../StyleSheets/images/propertySlider.jpg";
import algopic from "../StyleSheets/images/algo.jpg";
import "../StyleSheets/Slider.css";
const AutoplaySlider = withAutoplay(AwesomeSlider);

function Slider() {
  return (
    <div className="slider-main">
      <AutoplaySlider
        fillParent={true}
        play={true}
        mobileTouch={true}
        cancelOnInteraction={false} // should stop playing on user interaction
        interval={6000}
        // transitionDelay={2000}
        bullets={false}
        organicArrows={true}
      >
        <div>
          <img className="slider-image" src={prosliderpic}></img>
          <div className="slider-content">
            <div className="slider-content-heading">
              <h1>Know Where to Invest!</h1>
            </div>
            <div className="slider-content-description">
              <p>
                Want to invest but don't know where to? You've come to the right
                place!
              </p>
            </div>
          </div>
        </div>

        <div>
          <img className="slider-image" src={algopic}></img>
          <div className="slider-content">
            <div className="slider-content-heading">
              <h1>The Best Practices!</h1>
            </div>
            <div className="slider-content-description">
              <p>Get access to strategies and practices created by experts!</p>
            </div>
          </div>
        </div>
        <div>
          <img className="slider-image" src={begginerpic}></img>
          <div className="slider-content">
            <div className="slider-content-heading">
              <h1>Easy For Everyone!</h1>
            </div>
            <div className="slider-content-description">
              <p>
                A beginner? No problem! Get the predicted data and invest. No
                technical skills required!
              </p>
            </div>
          </div>
        </div>
      </AutoplaySlider>
    </div>
  );
}
export default Slider;
