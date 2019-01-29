import React, { Component } from 'react';
import Editor from './components/Editor';
import Previewer from './components/Previewer';
import Toolbar from './components/Toolbar';

import './App.css';

class App extends Component {

  initialMarkdown = `# React Markdown Previewer!

  ## This is a sub-heading...
  ### And here's some other cool stuff:
    
  Heres some code, \`<div></div>\`, between 2 backticks.
  
  \`\`\`
  // this is multi-line code:
  
  function anotherExample(firstLine, lastLine) {
    if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
      return multiLineCode;
    }
  }
  \`\`\`
    
  You can also make text **bold**... whoa!
  Or _italic_.
  Or... wait for it... **_both!_**
  And feel free to go crazy ~~crossing stuff out~~.
  
  There's also [links](https://www.freecodecamp.com), and
  > Block Quotes!
  
  And if you want to get really crazy, even tables:
  
  Wild Header | Crazy Header | Another Header?
  ------------ | ------------- | ------------- 
  Your content can | be here, and it | can be here....
  And here. | Okay. | I think we get it.
  
  - And of course there are lists.
    - Some are bulleted.
       - With different indentation levels.
          - That look like this.
  
  
  1. And there are numbererd lists too.
  1. Use just 1s if you want! 
  1. But the list goes on...
  
  ![React Logo w/ Text](https://goo.gl/Umyytc)
  `

  state = {
    input : this.initialMarkdown,
    selectionStart: this.initialMarkdown.length,
    selectionEnd: this.initialMarkdown.length
  }

  handleChange = (event) => {
    this.setState({
      input: event.target.value,
      selectionStart: event.target.selectionStart,
      selectionEnd: event.target.selectionEnd
    });
  }

  addToText = (buttonText) => {

    let currentInput = this.state.input;

    let start = this.state.selectionStart;
    let end = this.state.selectionEnd;
    let test = currentInput.substring(0, start) + buttonText + currentInput.substring(end);
    let buttonTextLength = buttonText.length;

    this.setState({
      input: test,
      selectionStart: start + buttonTextLength,
      selectionEnd: end + buttonTextLength
    });
  }

  handleKeyDown = (input, start) => {
    this.setState({
      input: input,
      selectionStart: start,
      selectionEnd: start
    });
  }

  handleClick = (event) => {
    this.setState({
      selectionStart: event.target.selectionStart,
      selectionEnd: event.target.selectionEnd
    })
  }

  render() {
    return (
      <div className="App">
          <Toolbar addToText = {this.addToText}/>

          <Editor 
          input = {this.state.input} 
          updateText = {this.handleChange}
          handleKeyDown = {this.handleKeyDown}
          selectionStart = {this.state.selectionStart}
          selectionEnd = {this.state.selectionEnd}
          handleClick = {this.handleClick}/>

          <Previewer input = {this.state.input}/>
      </div>
    );
  }
}

export default App;
