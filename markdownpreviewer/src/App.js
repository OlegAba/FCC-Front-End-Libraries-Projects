import React, { Component } from 'react';
import Editor from './components/Editor';
import Previewer from './components/Previewer';

import './App.css';

class App extends Component {

  state = {
    input : '# test123'
  }

  handleChange = (event) => {
    this.setState({
      input: event.target.value
    });
  }

  render() {
    return (
      <div className="App">
          <Editor input = {this.state.input} updateText = {this.handleChange}/>
          <Previewer input = {this.state.input}/>
      </div>
    );
  }
}

export default App;
