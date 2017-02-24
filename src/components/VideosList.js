import React, { Component } from 'react';
import VideoItem from './VideoItem';

class VideosList extends Component {
    render() {
        let videos = this.props.videosData ?
            this.props.videosData.map((video, idx) => {
                return <VideoItem
                    key={idx}
                    idx={idx}
                    video={video}
                    onVideoSelect={this.props.onVideoSelect}
                />
            })
            : (<p>Channel loading...</p>);
        return (
            <section className='container'>
                <div className='videos-list col-xs-12 col-md-8 col-md-offset-2'>
                    {videos}
                </div>
            </section>
        )
    }
}

VideosList.PropTypes = {
    videosData: React.PropTypes.object.required,
    onVideoSelect: React.PropTypes.func.required
}

export default VideosList;
