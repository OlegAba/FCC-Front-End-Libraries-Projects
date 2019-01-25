import React, { Component } from 'react';

class Toolbar extends Component {

    buttonText = {
        'fa fa-bold': '**Strong Text**',
        'fa fa-italic': '_Emphasized Text_',
        'fa fa-quote-left': '> Block Quote',
        'fa fa-link': '[Link]()',
        'fa fa-picture-o': '![Alt Text]()',
        'fa fa-list-ol': '1. List Item',
        'fa fa-list': '- List Item',
        'fa fa-code': '`Inline Code`'
    }

    render() {
        const icons = Object.keys(this.buttonText).map(key => {
            return <i 
            key = {key}
            value = {this.buttonText[key]}
            className = {key}
            onClick = {this.props.addToText}></i>
        })

        return (
            <div>{icons}</div>
        );
    }
}

export default Toolbar;
