import React, { Component } from 'react';
import Toolbar from './Toolbar';

class Editor extends Component {

    handleKeyDown = (event) => {
        // TODO : Refactor to switch statement
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

        // REDO and UNDO Logic
        if (event.metaKey === true || event.ctrlKey === true) {
            if (event.keyCode === 89) {
                console.log("Redo1");
                event.preventDefault();
            } else if (event.keyCode === 90) {
                if (event.shiftKey === true) {
                    console.log("Redo2");
                    console.log(this.props.undoRedo.canRedo());
                    this.props.undoRedo.redo();
                } else {
                    console.log("Undo2");
                    console.log(this.props.undoRedo.canUndo());
                    this.props.undoRedo.undo();
                }
                event.preventDefault();
            }

        }
    }

    componentDidUpdate() {
        this.refs.editor.selectionStart = this.props.selectionStart;
        this.refs.editor.selectionEnd = this.props.selectionEnd; 
        this.refs.editor.focus();
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

    addStep = () => {
        setTimeout(() => {
            this.props.undoRedo.addStep();
        });
    }


    render() {
        return (
            <div>
                <Toolbar />

                <textarea autoFocus
                id = "editor" 
                name="editor" 
                ref = "editor"
                rows="30"
                cols="100"
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
