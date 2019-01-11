import React, { Component } from 'react';

class Editor extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <textarea name="editor" rows="4" value = {this.props.editorText} onChange = {}></textarea>
            </div>
        );
    }
}

export default Editor;
