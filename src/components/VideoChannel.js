import React, { Component } from 'react';
import ActiveVideo from './ActiveVideo';
import VideosList from './VideosList';
// import {CLIENT_ID, CLIENT_SECRET} from '../api-credentials';
// import base64 from 'base-64';
import 'whatwg-fetch';
import '../styles/style.css';

class VideoChannel extends Component {
    constructor() {
        super();
        this.state = {
            message: 'Content loading...',
            videos: undefined,
            activeVideo: 0
        }
    }

    componentDidMount() {
        this.loadChannel('1341');
    }

    loadChannel(id) {
        // fetch('https://api.vimeo.com/oauth/authorize/client', {
        //     method: 'post',
        //     headers: {
        //         'Authorization': 'basic ' + base64.encode(CLIENT_ID + ':' + CLIENT_SECRET),
        //         'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        //     },
        //     body: {
        //         'grant_type': 'client_credentials'
        //     }
        // })
        // .then(response => {
        //     debugger;
        // });
        fetch('http://vimeo.com/api/v2/channel/' + id + '/videos.json')
            .then(response => {
                return response.json();
            })
            .then(items => {
                this.setState({
                    videos: items,
                    activeVideo: 0
                });
            })
            .catch(error => {
                console.log(error);
                window.alert("Sorry, this channel couldn't be found.");
                this.setState({ message: "Sorry, this channel couldn't be found." });
            });
    }

    searchChannel(event, text) {
        if (event.key === 'Enter') {
            this.loadChannel(this.refs.search.value);
            this.refs.search.value = '';
        }
    }

    onVideoSelect(idx) {
        this.setState({ activeVideo: idx });
        window.scrollTo(0, 0);
    }

    render() {
        let activeVideo = this.state.videos ?
            <ActiveVideo video={this.state.videos[this.state.activeVideo]} />
            : <ActiveVideo message={this.state.message} />;
        return (
            <div className='video-channel'>
                <input
                    ref='search'
                    placeholder='Search for a channel...'
                    type='text'
                    className='video-channel__search-bar form-control'
                    aria-describedby='channel-search'
                    onKeyPress={this.searchChannel.bind(this)}
                />
                { activeVideo }
                <VideosList
                    videosData={this.state.videos}
                    onVideoSelect={this.onVideoSelect.bind(this)}
                />
            </div>
        )
    }

}

export default VideoChannel;
