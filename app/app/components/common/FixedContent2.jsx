import React from "react";

//export default class FixedContent extends React.Component {

let FixedContent = React.createClass({

  setFontSize() {
    var designedWidth = this.props.width;
    let actualWidth = Math.min(450, $(window).width());
    document.documentElement.style.fontSize = actualWidth * 100 / designedWidth + 'px';
  },

  componentWillMount() {
    this.setFontSize();
  },

  componentDidMount() {
    window.addEventListener("resize", this.setFontSize);
  },

  componentWillUnmount() {
    window.removeEventListener('resize', this.setFontSize);
  },

  adjustWidth() {
    $(this.refs.content).css(this.getContentStyle());
  },

  render() {
    var {className, children} = this.props;
    return (
      <div ref="content" className={className}>
        {children}
      </div>
    );
  }
});

export default FixedContent;

FixedContent.propTypes = {
  width: React.PropTypes.number.isRequired,
};

// fullWidth: 宽 100% 高按比例
// fullWidthCutHeight: 宽 100%, 高只显示一屏
