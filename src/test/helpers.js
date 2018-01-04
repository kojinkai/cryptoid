import React from 'react';
import { shallow } from 'enzyme';

export const componentFactory = (Component, defaults = {}) => {
  return (config = {}) => {
    const props = { ...defaults, ...config };
    return shallow(<Component { ...props } />);
  }
}
