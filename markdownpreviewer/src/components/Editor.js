import React, { Component } from 'react';

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
            
            this.props.handleKeyDown(input, start + 1);
        }
        
        // REDO and UNDO Logic
        if (event.metaKey === true || event.ctrlKey === true) {
            if (event.keyCode === 89) {
                console.log("Redo1");
                event.preventDefault();
            } else if (event.keyCode === 90) {
                if (event.shiftKey === true) {
                    console.log("Redo2");
                } else {
                    console.log("Undo2")
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

    render() {
        return (
            <div>
                <textarea autoFocus
                id = "editor" 
                name="editor" 
                ref = "editor"
                rows="30"
                cols="100"
                type = "text"
                value = {this.props.input}
                onClick = {this.props.handleClick} 
                onChange = {this.props.updateText}
                onKeyDown = {this.handleKeyDown}>
                </textarea>
            </div>
        );
    }
}

export default Editor;
