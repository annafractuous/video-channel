import React, { Component } from 'react';
import Vimeo from 'react-vimeo';

class ActiveVideo extends Component {
    constructor() {
        super();
        this.state = {
            error: undefined
            // playing: false
        }
        this.onError = this.onError.bind(this);
        // this.hideInfo = this.hideInfo.bind(this);
    }

    onError() {
        this.setState({ error: 'Sorry, this video could not be found' });
    }

    // Vimeo component's onPlay callback not functioning
    // hideInfo() {
    //     this.setState({ playing: true });
    // }

    render() {
        // let infoClass = this.state.playing ? 'active-video__info hidden' : 'active-video__info';
        let content = this.state.error || this.props.message ||
            <div className='active-video__container col-sm-8 col-sm-offset-2'>
                <Vimeo
                    videoId={this.props.video.id.toString()}
                    className='active-video__video'
                    onError={this.onError}
                    // onPlay={this.hideInfo}
                />
                {/* <figcaption className={infoClass}>
                    <h1 className='active-video__info-title'>{this.props.video.title}</h1>
                    <h5 className='active-video__info-user'>from {this.props.video.user_name}</h5>
                </figcaption> */}
            </div>;

        return (
            <section className='active-video container-fluid'>
                {content}
            </section>
        )
    }
}

ActiveVideo.PropTypes = {
    video: React.PropTypes.object,
    message: React.PropTypes.string
}

export default ActiveVideo;
