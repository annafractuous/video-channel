import React from 'react';
import { mount, shallow, debug } from 'enzyme';
import { expect } from 'chai';

import ActiveVideo from '../components/ActiveVideo';
import Vimeo from 'react-vimeo';


describe('<ActiveVideo>', function () {
    it('should display a video image', function () {
        const wrapper = mount(<ActiveVideo video={{id:'204886997'}}/>);
        expect(wrapper.find(Vimeo)).to.have.length(1);
    });

    it('should display the correct video image', function () {
        const wrapper = mount(<ActiveVideo video={{id:'204886997'}}/>);
        expect(wrapper.find(Vimeo).props().videoId).to.equal('204886997');
    });

    it("should show an error message if the video can't be found", function () {
        const wrapper = mount(<ActiveVideo video={{id:'204886997'}}/>);
        wrapper.instance().onError();
        expect(wrapper.find('.active-video__error')).to.have.length(1);
    });
});
