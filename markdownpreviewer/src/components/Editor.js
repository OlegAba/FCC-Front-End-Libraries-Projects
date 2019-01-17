import React, { Component } from 'react';

class Editor extends Component {

    render() {
        return (
            <div>
                <textarea 
                name="editor" 
                rows="4" 
                value = {this.props.input} 
                onChange = {this.props.updateText}>
                </textarea>
            </div>
        );
    }
}

export default Editor;
