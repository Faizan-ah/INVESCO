import React from "react";
import ReactToPrint from "react-to-print";

import Favourites from "./Favourites";

class Example extends React.PureComponent {
  render() {
    return (
      <div>
        <ReactToPrint
          trigger={() => {
            // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
            // to the root node of the returned component as it will be overwritten.
            return <a href="#">Print this out!</a>;
          }}
          content={() => this.componentRef}
        />
        <Favourites ref={(el) => (this.componentRef = el)} />
      </div>
    );
  }
}
