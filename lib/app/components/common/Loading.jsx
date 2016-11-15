import React from "react";
require('./Loading.gscss');

export default class Loading extends React.Component {

  render() {
    return (
      <div>
        <div className="spinner">
          <div className="spinner-container container1">
            <div className="circle1"></div>
            <div className="circle2"></div>
            <div className="circle3"></div>
            <div className="circle4"></div>
          </div>
          <div className="spinner-container container2">
            <div className="circle1"></div>
            <div className="circle2"></div>
            <div className="circle3"></div>
            <div className="circle4"></div>
          </div>
          <div className="spinner-container container3">
            <div className="circle1"></div>
            <div className="circle2"></div>
            <div className="circle3"></div>
            <div className="circle4"></div>
          </div>
        </div>
      </div>
    );
  }
}

Loading.propTypes = {
  title: React.PropTypes.string,
};
