import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow, mount } from 'enzyme';

describe('<MyApp />', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });

  it('should render input search bar component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('#search-bar').length).toBe(1);
  });

  it("should render a list", function() {
    const renderListSpy = jest.spyOn(App.prototype, "renderList");
    const wrap = shallow(<App />);
    expect(renderListSpy).toHaveBeenCalled();
  });
  
});