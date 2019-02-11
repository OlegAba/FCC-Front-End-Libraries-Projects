import React, { Component } from 'react';
import Toolbar from './Toolbar';

import './Editor.css';

class Editor extends Component {

    componentDidUpdate() {
        this.refs.editor.selectionStart = this.props.selectionStart;
        this.refs.editor.selectionEnd = this.props.selectionEnd; 
        this.refs.editor.focus();
    }

    handleKeyDown = (event) => {
        // Handle tab key press
        if (event.keyCode === 9) {
            event.preventDefault();

            let val = this.props.input;
            let start = event.target.selectionStart;
            let end = event.target.selectionEnd;
            
            let input = val.substring(0, start) + '\t' + val.substring(end);
            
            this.props.updateState(input, start + 1, start + 1);
            this.addStep();
        }

        // Handle redo/undo key press
        if (event.metaKey === true || event.ctrlKey === true) {
            if (event.keyCode === 89) {
                event.preventDefault();

                if (this.props.undoRedo.canRedo()) {
                    this.props.undoRedo.redo(); 
                }
            } else if (event.keyCode === 90) {
                if (event.shiftKey === true) {
                    event.preventDefault();

                    if (this.props.undoRedo.canRedo()){
                        this.props.undoRedo.redo();
                    }
                } else {
                    event.preventDefault();

                    if (this.props.undoRedo.canUndo()) {
                        this.props.undoRedo.undo();
                    }
                }
            }

        }
    }

    updateText = (event) => {
        let input = event.target.value;
        let selectionStart = event.target.selectionStart;
        let selectionEnd = event.target.selectionEnd;

        this.props.updateState(input, selectionStart, selectionEnd);

        this.addStep();
    }

    handleClick = (event) => {
        let selectionStart = event.target.selectionStart;
        let selectionEnd = event.target.selectionEnd;

        this.props.updateState(null, selectionStart, selectionEnd);
        this.addStep();
    }

    addToText = (buttonMarkdown) => {
        let currentInput = this.props.input;

        let start = this.props.selectionStart;
        let end = this.props.selectionEnd;
        let newInput = currentInput.substring(0, start) + buttonMarkdown + currentInput.substring(end);

        let addToStart = buttonMarkdown.substring(0).search(/[A-Za-z]/);

        // TODO: Change function name
        let andToEnd = () => {
            let length = buttonMarkdown.length - 1;

            for (let index = length; index >= 0; index--) {
                let currentChar = buttonMarkdown[index];

                if (!currentChar.search(/[A-Za-z]/)) {
                return index + 1;
                }
            }
        };

        this.props.updateState(newInput, start + addToStart, start + andToEnd());

        this.addStep();
    }

    addStep = () => {
        setTimeout(() => {
            this.props.undoRedo.addStep();
        });
    }


    render() {
        return (
            <div className = "wrapper">
                <div className = "toolbar-container">
                    <Toolbar addToText = {this.addToText}/>
                </div>

                <textarea autoFocus
                id = "editor" 
                name="editor" 
                ref = "editor"
                type = "text"
                value = {this.props.input}
                onClick = {this.handleClick} 
                onChange = {this.updateText}
                onKeyDown = {this.handleKeyDown}>
                </textarea>
            </div>
        );
    }
}

export default Editor;