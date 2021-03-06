import React, { Component } from 'react';

class Toolbar extends Component {

    buttonMarkdown = {
        'fa fa-bold': '**Strong Text** ',
        'fa fa-italic': '_Emphasized Text_ ',
        'fa fa-quote-left': '> Block Quote ',
        'fa fa-link': '[Link]()',
        'fa fa-list-ol': '1. List Item ',
        'fa fa-list': '- List Item ',
        'fa fa-code': '`Inline Code` ',
        'fa fa-file-image': '![Alt Text]() '
    }

    render() {
        const icons = Object.keys(this.buttonMarkdown).map(key => {
            return <i
            key = {key}
            className = {'toolbar-icons ' + key}
            onClick = {this.props.addToText.bind(this, this.buttonMarkdown[key])}
            ></i>
        })

        return (
            <div>{icons}</div>
        );
    }
}

export default Toolbar;