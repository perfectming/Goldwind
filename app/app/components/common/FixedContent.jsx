import React from "react";
import $ from 'jquery';

//export default class FixedContent extends React.Component {

let FixedContent = React.createClass({

  getContentStyle(){
    let {mode, origin} = this.props;
    let designWidth = this.props.width;
    let actualWidth = Math.min(1920, $(window).width());
    let widthScale = actualWidth / designWidth;

    if (mode === 'fullWidth') {
      return {
        "transform": "scale(" + widthScale + "," + widthScale + ")",
        "transformOrigin": "0px " + (origin || '0px') + " 0px",
        "WebkitTransform": "scale(" + widthScale + "," + widthScale + ")",
        "WebkitTransformOrigin": "0px " + (origin || '0px') + " 0px",
      };
    } else {
      return {};
    }
  },

  componentDidMount() {
    window.addEventListener("resize", this.adjustWidth);
  },

  componentWillUnmount() {
    window.removeEventListener('resize', this.adjustWidth);
  },

  adjustWidth() {
    $(this.refs.content).css(this.getContentStyle());
  },

  render() {
    var {className, children, width } = this.props;
    let style = this.getContentStyle();
    return (
      <div style={{height: 0, width: 0}}>
        <div ref="content" style={{width, ...style}} className={className}>
          {children}
        </div>
      </div>
    );
  }
});

export default FixedContent;

FixedContent.propTypes = {
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number,
  mode: React.PropTypes.oneOf(['fullWidth', 'fullWidthCutHeight']),
  origin: React.PropTypes.oneOf(['top', 'bottom'])
};

FixedContent.defaultProps = {
  mode: 'fullWidth',
};

// fullWidth: 宽 100% 高按比例
// fullWidthCutHeight: 宽 100%, 高只显示一屏
