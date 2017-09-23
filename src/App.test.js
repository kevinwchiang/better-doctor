import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from './App';

describe('<App />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });

  it('should render input search bar component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('#search-bar').length).toBe(1);
  });

  it('should render a list', () => {
    const renderListSpy = jest.spyOn(App.prototype, 'renderList');
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    expect(renderListSpy).toHaveBeenCalled();
  });
});
