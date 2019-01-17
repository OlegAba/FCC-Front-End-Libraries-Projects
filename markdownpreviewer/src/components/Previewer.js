import React, { Component } from 'react';
import marked from 'marked'

class Previewer extends Component {

    getMarkedHtml = (input) => {
        let markedHtml = marked(input);
        return { __html : markedHtml };
    }

    render() {
        return (
            <div dangerouslySetInnerHTML={ this.getMarkedHtml(this.props.input) }></div>
    );
  }
}

export default Previewer;
