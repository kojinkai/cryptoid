import React from 'react';
import { shallow } from 'enzyme';
import Indicator from './indicator';

describe('when rendering the Indicator component', () => {
  it('it should render an aggregate price', () => {
    const dummyClass = 'foo__class'
    const wrapper = shallow(<Indicator className={dummyClass} />);
    expect(wrapper.hasClass(dummyClass)).toEqual(true);    
  });
});
