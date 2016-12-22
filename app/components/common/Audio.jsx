import React from "react";
import styles from "./Audio.scss";

import turnOn from "./turn-on.png";
import turnOff from "./turn-off.png";

export default class Audio extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  musicPlay() {
    if (this.refs.audio.paused) {
      this.refs.audio.play();
      this.setState({
        isPause: false
      });
    } else {
      this.refs.audio.pause();
      this.setState({
        isPause: true
      });
    }
  }

  render() {
    var {src, imgStyle} = this.props;
    return (
      <div {...this.props}>
        <div className={styles.music} onClick={()=>this.musicPlay()} style={imgStyle}>
          {this.state.isPause && <img src={turnOff}/>}
          {!this.state.isPause && <img src={turnOn} className={styles.musicPlaying}/>}
        </div>
        <audio ref="audio" src={src} loop="loop" autoPlay="autoplay">
        </audio>
      </div>
    );
  }
}

Audio.propTypes = {
  src: React.PropTypes.string.isRequired
};
