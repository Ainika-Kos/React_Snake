import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';

Enzyme.configure({ adapter: new Adapter() });

describe('<App />', () => {
  it('renders <App /> component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toHaveLength(1);
  });
  it('renders <Play /> component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('Play')).toHaveLength(1);
  });
});