import React, { Component } from 'react';
import VideoItem from './VideoItem';

const VideosList = ({videosData, onVideoSelect}) => {
    let videos = videosData ?
        videosData.map((video, idx) => {
            return <VideoItem
                key={idx}
                idx={idx}
                video={video}
                onVideoSelect={onVideoSelect}
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

export default VideosList;
