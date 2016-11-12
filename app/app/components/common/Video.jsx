import React from "react";
import styles from "./Video.scss";
import $ from "jquery";

export default class Video extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playingVideo: false,
      videoLoading: false,
    };
  }

  getVideoElement() {
    return this.refs.video;
  }

  componentDidMount() {
    let video = this.getVideoElement();

    this.canPlayVideo = false;

    video.addEventListener("canplaythrough", () => {
      this.setState({
        videoLoading: false,
      });
      this.canPlayVideo = true;
    }, false);
  }

  videoClick() {
    let video = this.getVideoElement();
    video.controls = !video.controls;
  }

  playVideo() {
    this.setState({
      playingVideo: true,
      videoLoading: true,
    });
    let video = this.getVideoElement();

    if (video.paused) {
      if (this.canPlayVideo) {
        this.setState({
          videoLoading: false,
        });
      }
      video.play();
    } else {
      video.pause();
    }
  }

  render() {
    //return (
    //  <video poster={img} ref="video" onClick={() => this.play()} src="http://ips.ifeng.com/video19.ifeng.com/video09/2016/01/18/3798579-102-009-1011.mp4" style={{width:'100%',border:'2px solid #fff'}}>
    //  </video>
    //);
    let {image, video} = this.props;
    let {playingVideo, videoLoading} = this.state;

    return (
      <div className={styles.directiveVideo}>
        <video ref="video" className={!playingVideo && "hide"} src={video} type="video/mp4"
               onClick={this.videoClick.bind(this)} controls="false"/>
        {!playingVideo && <img src={image} onClick={this.playVideo.bind(this)}/>}
        {videoLoading && <div className={styles.loading}>加载中...</div>}
      </div>
    );
  }
};

Video.propTypes = {
  image: React.PropTypes.string.isRequired,
  video: React.PropTypes.string.isRequired
};
