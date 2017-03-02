import React from 'react';
import { shallow, debug } from 'enzyme';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';

import VideoItem from '../components/VideoItem';
import getDuration from '../util/duration';

chai.use(chaiEnzyme());


const video = {
    description: "From the towering green spires to the pristine beaches, the stunning island of Kauai offers an incredible range of unique landscapes to explore. 'Symphony of Light' aims to take a close look at the shapes and forms of the island, showcased through the relationship between light and shadow.<br /><br />I created a post showing a bunch of behind the scenes images and talking about some of the shots in the video. Please check it out, if you are interested.",
    duration: 174,
    id: 205090959,
    stats_number_of_comments: 74,
    stats_number_of_likes: 1304,
    stats_number_of_plays: 71029,
    thumbnail_medium: "https://i.vimeocdn.com/video/619779422_200x150.jpg",
    title: "Symphony of Light - Kauai Timelapse",
    url: "https://vimeo.com/205090959",
    user_id: 1290686,
    user_name: "Michael Shainblum",
    user_portrait_small: "https://i.vimeocdn.com/portrait/15074164_30x30",
    user_url: "https://vimeo.com/shainblum"
}

describe('<VideoItem>', function () {
    it('should display video thumbnail & duration', function () {
        const wrapper = shallow(<VideoItem video={video}/>);
        let thumbnail = wrapper.find('.video-item-thumbnail img'),
            duration = wrapper.find('.video-item-thumbnail__video-length');
        expect(thumbnail).to.have.attr('src', video.thumbnail_medium);
        expect(duration).to.contain.text(getDuration(video.duration));
    });

    it('should display a title, description and user', function () {
        const wrapper = shallow(<VideoItem video={video}/>);
        let title = wrapper.find('.video-item-details__description-title'),
            description = wrapper.find('.video-item-details__description-summary'),
            user = wrapper.find('.video-item-details__info-user');
        expect(title).to.contain.text(video.title);
        expect(description).to.contain.text(video.description.slice(0,15));
        expect(user).to.contain.text(video.user_name);
    });

    it('should cut off long descriptions with an ellipsis', function () {
        const wrapper = shallow(<VideoItem video={video}/>);
        let description = wrapper.find('.video-item-details__description-summary').text();
        let lastIdx = description.length - 1;
        expect(description.slice(lastIdx - 3, lastIdx)).to.equal('...');
    });

    it('should say there is no description if the description is blank', function () {
        let noDescVideo = Object.assign({}, video, { description: '' });
        const wrapper = shallow(<VideoItem video={noDescVideo}/>);
        let description = wrapper.find('.video-item-details__description-summary');
        expect(description).to.contain.text('There is no description for this video.');
    });

    it('should shorten numbers over 1000 to _K', function () {
        const wrapper = shallow(<VideoItem video={video}/>);
        let numPlays = wrapper.find('.video-item-details__info-stats__stat-plays');
        expect(numPlays).to.contain.text('71K');
    });

    it('should put 0 if a stat is blank e.g. undefined', function () {
        let noStatVideo = Object.assign({}, video, { stats_number_of_comments: undefined });
        const wrapper = shallow(<VideoItem video={noStatVideo}/>);
        let numComments = wrapper.find('.video-item-details__info-stats__stat-comments');
        expect(numComments).to.contain.text('0');
    });
});
