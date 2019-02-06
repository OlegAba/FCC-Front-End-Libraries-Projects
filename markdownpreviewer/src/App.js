import React, { Component } from 'react';
import UndoRedo from 'react-undo';

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

  addToText = (buttonMarkdown) => {

    let currentInput = this.state.input;

    let start = this.state.selectionStart;
    let end = this.state.selectionEnd;
    let newInput = currentInput.substring(0, start) + buttonMarkdown + currentInput.substring(end);

    let addToStart = buttonMarkdown.substring(0).search(/[A-Za-z]/);

    let andToEnd = () => {
      let length = buttonMarkdown.length - 1;

      for (let index = length; index >= 0; index--) {
        let currentChar = buttonMarkdown[index];

        if (!currentChar.search(/[A-Za-z]/)) {
          return index + 1;
        }
      }
    };

    this.setState({
      input: newInput,
      selectionStart: start + addToStart,
      selectionEnd: start + andToEnd()
    });
  }

  updateState = (input, selectionStart, selectionEnd) => {
    let guardInput = input ? input : this.state.input;
    let guradSelectionStart = selectionStart ? selectionStart : this.state.selectionStart;
    let gurardSelectionEnd = selectionEnd ? selectionEnd : this.state.selectionEnd;

    this.setState({
      input: guardInput,
      selectionStart: guradSelectionStart,
      selectionEnd: gurardSelectionEnd
    });
  }

  undoRedoState = (event) => {
    this.updateState(event.input, event.selectionStart, event.selectionEnd);
  }

  render() {
    return (
      <div className="App">
          <Toolbar addToText = {this.addToText}/>

          {/* <Editor 
          input = {this.state.input} 
          updateText = {this.handleChange}
          handleKeyDown = {this.handleKeyDown}
          selectionStart = {this.state.selectionStart}
          selectionEnd = {this.state.selectionEnd}
          handleClick = {this.handleClick}/> */}

          <UndoRedo 
            as = { Editor }
            props = { {
              input: this.state.input,
              selectionStart: this.state.selectionStart,
              selectionEnd: this.state.selectionEnd,
              handleClick: this.handleClick,
              updateState: this.updateState,
              handleKeyDown: this.handleKeyDown
            } }
            trackProps = { ['input', 'selectionStart', 'selectionEnd'] }
            onChange = { (props) => { this.undoRedoState(props)} }
          />

          <Previewer input = {this.state.input}/>
      </div>
    );
  }
}

export default App;
