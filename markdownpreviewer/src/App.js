import React, { Component } from 'react';
import UndoRedo from 'react-undo';

import Editor from './components/Editor';
import Previewer from './components/Previewer';

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
    if (event.input === this.state.input) { return; }
    
    this.updateState(event.input, event.selectionStart, event.selectionEnd);
  }

  render() {
    return (
      <div>

          <div id = "header">
            <a><i class="fab fa-react"></i>React Markdown Previewer</a>
            {/* <h1>React Markdown Previewer</h1> */}
          </div>

          <UndoRedo 
            as = { Editor }
            props = { {
              input: this.state.input,
              selectionStart: this.state.selectionStart,
              selectionEnd: this.state.selectionEnd,
              updateState: this.updateState
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