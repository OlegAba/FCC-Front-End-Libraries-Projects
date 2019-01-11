import React, { Component } from 'react';
import Editor from './components/Editor';
import Previewer from './components/Previewer';

import './App.css';

class App extends Component {

  state = {
    editorText : '# test123'
  }

  render() {
    return (
      <div className="App">
          <Editor editorText = {this.state.editorText}/>
          <Previewer editorText = {this.state.editorText}/>
      </div>
    );
  }
}

export default App;
