import React from 'react';
import { mount, shallow, debug } from 'enzyme';
import sinon, { stub } from 'sinon';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';

import VideoChannel from '../components/VideoChannel';
import ActiveVideo from '../components/ActiveVideo';
import VideoItem from '../components/VideoItem';
import { videoChannel } from './stub-data/video-channel';

chai.use(chaiEnzyme());


describe('<VideoChannel>', function () {
    let server, wrapper;

    beforeEach(() => {
        server = sinon.fakeServer.create();
        let response = [200, {'Content-type': 'application/json'}, JSON.stringify(videoChannel)];
        server.respondWith('GET', 'http://vimeo.com/api/v2/channel/staffpicks/videos.json', response);

        wrapper = mount(<VideoChannel />);
        server.respond();
        wrapper.instance().setState({ videos: videoChannel });
    })

    afterEach(() => {
        server.restore();
    });

    it('should display the first video as the active video', function () {
        let activeVideo = wrapper.find(ActiveVideo);
        expect(activeVideo.props().video.id).to.equal(videoChannel[0].id);
    });

    it('should update the active video when a video is selected from the list', function () {
        let activeVideo = wrapper.find(ActiveVideo),
            otherVideo = wrapper.find(VideoItem).at(1),
            videoThumbnail = otherVideo.find('button');
        videoThumbnail.simulate('click');
        expect(activeVideo.props().video.id).to.equal(otherVideo.props().video.id);
    });
});
