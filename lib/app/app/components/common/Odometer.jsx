import React from "react";
import Odometer from 'odometer';
require("./Odometer.gscss");

export default class OdometerComponent extends React.Component {
  componentDidMount() {
    var { value } = this.props;
    this.od = new Odometer({
      el: this.refs.odometer,
      value: value,
      format: '',
      theme: 'default'
    });
    this.od.render();
  }

  componentDidUpdate() {
    var { value } = this.props;
    this.od.update(value);
  }

  render() {
    return (
      <span ref="odometer" className="odometer"/>
    );
  }
}

OdometerComponent.propTypes = {
  value: React.PropTypes.number.isRequired
};
