import React, { Component } from 'react';
import 'whatwg-fetch';
import { throttle } from 'lodash';
import logo from './logo.png';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skip: 0,
      doctors: [],
      search: '',
    };
    this.fetchDoctors = throttle(this.fetchDoctors.bind(this), 1000);
    this.renderList = this.renderList.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  onSearchChange(event) {
    const value = event.target.value;
    this.setState({ search: value });
    this.fetchDoctors(value);
  }

  fetchDoctors(newSearch) {
    const { skip, doctors, search } = this.state;
    if (newSearch === '') {
      this.setState({ doctors: [] });
      return;
    }
    const searchBody = {
      skip: newSearch ? 0 : skip,
      name: !newSearch ? search : newSearch,
    };
    fetch('http://localhost:1337/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(searchBody),
    })
      .then(response => response.json())
      .then((body) => {
        const parsedBody = JSON.parse(body);
        this.setState({
          skip: skip + 10,
          doctors: newSearch ? parsedBody.data : doctors.concat(parsedBody.data),
        });
      });
  }

  handleScroll() {
    const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight,
    );
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      this.fetchDoctors();
    }
  }

  renderList() {
    const { doctors } = this.state;
    return (
      <div className="list-container">
        {doctors && doctors.map((doctor) => {
          const { profile } = doctor;
          return (
            <div className="list-item" key={doctor.uid}>
              <a className="profile-name">Name: {profile.first_name}  {profile.last_name}</a>
              <a className="profile-title">Title: {profile.title}</a>
              <a className="profile-last">Bio: {profile.bio}</a>
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <input
          id="search-bar"
          value={this.state.search}
          onChange={event => this.onSearchChange(event)}
          placeholder={'Search for a Doctor...'}
        />
        {this.renderList()}
      </div>
    );
  }
}

export default App;
