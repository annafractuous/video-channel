import React, { Component } from 'react';
import truncate from '../util/truncate';
import thousands from '../util/thousands';
import getDuration from '../util/duration';


const VideoDesc = ({video, selectVideo, getSummaryCutoff}) => {
    let firstPara = !!video.description.length ?
        video.description.split('<br />')[0] :
        'There is no description for this video.';

    return (
        <div className='video-item-details__description'>
            <h4 className='video-item-details__description-title' onClick={selectVideo}>{video.title}</h4>
            <p className='video-item-details__description-summary'>
                {truncate(firstPara, getSummaryCutoff())}
            </p>
        </div>
    )
}

const VideoThumbnail = ({video, selectVideo}) => {
    return (
        <button className='video-item-thumbnail__button' onClick={selectVideo} aria-label="View video">
            <span className='video-item-thumbnail__play-icon'>
                <span className='glyphicon glyphicon-play'></span>
            </span>
            <img
                src={video.thumbnail_medium}
                alt={video.title + ' thumbnail'}
                className='video-item-thumbnail__image'
            />
            <span className='video-item-thumbnail__video-length'>{getDuration(video.duration)}</span>
        </button>
    )
}

const VideoStats = ({video}) => {
    return (
        <div className='video-item-details__info-stats'>
            <span className='video-item-details__info-stats__stat'>
                <span className='glyphicon glyphicon-eye-open'></span>
                <span className='video-item-details__info-stats__stat-plays'>
                    {thousands(video.stats_number_of_plays) || 0}
                </span>
            </span>
            <span className='video-item-details__info-stats__stat'>
                <span className='glyphicon glyphicon-heart'></span>
                <span className='video-item-details__info-stats__stat-likes'>
                    {thousands(video.stats_number_of_likes) || 0}
                </span>
            </span>
            <span className='video-item-details__info-stats__stat'>
                <span className='glyphicon glyphicon-comment'></span>
                <span className='video-item-details__info-stats__stat-comments'>
                    {thousands(video.stats_number_of_comments) || 0}
                </span>
            </span>
        </div>
    )
}

const VideoAuthor = ({video}) => {
    let username = document.documentElement.clientWidth > 480 ? video.user_name : truncate(video.user_name, 20);

    return (
        <div className='video-item-details__info-user'>
            <a href={video.user_url}>
                <img
                    src={video.user_portrait_small}
                    alt={video.user_name}
                    className='video-item-details__info-user__avatar'
                />
                <span>{username}</span>
            </a>
        </div>
    )
}

class VideoItem extends Component {
    constructor() {
        super();
        this.selectVideo = this.selectVideo.bind(this);
    }

    selectVideo() {
        this.props.onVideoSelect(this.props.idx);
    }

    getSummaryCutoff() {
        let screenSize = document.documentElement.clientWidth;
        if (screenSize >= 1200) { return 270 } else
        if (screenSize >= 992) { return 200 } else
        if (screenSize >= 768) { return 250 } else
        { return 145 }
    }

    render() {
        let video = this.props.video;

        return (
            <div className='video-item'>
                <figcaption className='video-item-details col-xs-8'>
                    <VideoDesc
                        video={video}
                        selectVideo={this.selectVideo}
                        getSummaryCutoff={this.getSummaryCutoff}
                    />
                    <div className='video-item-details__info'>
                        <VideoAuthor video={video} />
                        <VideoStats video={video} />
                    </div>
                </figcaption>
                <figure className='video-item-thumbnail col-xs-4'>
                    <VideoThumbnail
                        video={video}
                        selectVideo={this.selectVideo}
                    />
                </figure>
            </div>
        );
    }
}

VideoItem.PropTypes = {
    video: React.PropTypes.object.required
}

export default VideoItem;
