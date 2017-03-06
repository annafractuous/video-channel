import React from 'react';
import { mount, debug } from 'enzyme';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';

import VideoItem from '../components/VideoItem';
import getDuration from '../util/duration';
import { video } from './stub-data/video';

chai.use(chaiEnzyme());


describe('<VideoItem>', function () {
    it('should display video thumbnail & duration', function () {
        const wrapper = mount(<VideoItem video={video}/>);
        let thumbnail = wrapper.find('.video-item-thumbnail img'),
            duration = wrapper.find('.video-item-thumbnail__video-length');
        expect(thumbnail).to.have.attr('src', video.thumbnail_medium);
        expect(duration).to.contain.text(getDuration(video.duration));
    });

    it('should display a title, description and user', function () {
        const wrapper = mount(<VideoItem video={video}/>);
        let title = wrapper.find('.video-item-details__description-title'),
            description = wrapper.find('.video-item-details__description-summary'),
            user = wrapper.find('.video-item-details__info-user');
        expect(title).to.contain.text(video.title);
        expect(description).to.contain.text(video.description.slice(0,15));
        expect(user).to.contain.text(video.user_name);
    });

    it('should cut off long descriptions with an ellipsis', function () {
        const wrapper = mount(<VideoItem video={video}/>);
        let description = wrapper.find('.video-item-details__description-summary').text(),
            lastIdx = description.length - 1;
        expect(description.slice(lastIdx - 3, lastIdx)).to.equal('...');
    });

    it('should say there is no description if the description is blank', function () {
        let noDescVideo = Object.assign({}, video, { description: '' });
        const wrapper = mount(<VideoItem video={noDescVideo}/>);
        let description = wrapper.find('.video-item-details__description-summary');
        expect(description).to.contain.text('There is no description for this video.');
    });

    it('should shorten numbers over 1000 to _K', function () {
        const wrapper = mount(<VideoItem video={video}/>);
        let numPlays = wrapper.find('.video-item-details__info-stats__stat-plays');
        expect(numPlays).to.contain.text('71K');
    });

    it('should put 0 if a stat is blank e.g. undefined', function () {
        let noStatVideo = Object.assign({}, video, { stats_number_of_comments: undefined });
        const wrapper = mount(<VideoItem video={noStatVideo}/>);
        let numComments = wrapper.find('.video-item-details__info-stats__stat-comments');
        expect(numComments).to.contain.text('0');
    });
});
