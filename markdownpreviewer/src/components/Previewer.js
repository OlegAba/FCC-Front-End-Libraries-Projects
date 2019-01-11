import React, { Component } from 'react';
import marked from 'marked'

class Previewer extends Component {

    constructor(props) {
        super(props);
    }

    getMarkedHtml = () => {
        let markedHtml = marked(this.props.editorText);
        return { __html : markedHtml };
    }

    render() {
        return (
            <div dangerouslySetInnerHTML={ this.getMarkedHtml() }></div>
    );
  }
}

export default Previewer;
