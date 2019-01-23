import React, { Component } from 'react';

class Editor extends Component {

    render() {
        return (
            <div>
                <textarea
                id = "editor" 
                name="editor" 
                rows="4"
                type = "text" 
                value = {this.props.input} 
                onChange = {this.props.updateText}>
                </textarea>
            </div>
        );
    }
}

export default Editor;
