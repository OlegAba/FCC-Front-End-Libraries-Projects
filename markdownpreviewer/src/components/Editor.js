import React, { Component } from 'react';

class Editor extends Component {

    handleKeyDown = (event) => {
        // Handle tab key press
        if (event.keyCode === 9) {
            event.preventDefault();

            let val = this.props.input;
            let start = event.target.selectionStart;
            let end = event.target.selectionEnd;
            
            let input = val.substring(0, start) + '\t' + val.substring(end);
            
            this.props.handleKeyDown(input, start + 1);
        }
    }

    componentDidUpdate() {
        this.refs.editor.selectionStart = this.props.selectionStart;
        this.refs.editor.selectionEnd = this.props.selectionEnd; 
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
