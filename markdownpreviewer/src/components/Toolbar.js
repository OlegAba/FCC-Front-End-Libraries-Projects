import React, { Component } from 'react';

class Toolbar extends Component {

    buttonMarkdown = {
        'fa fa-bold': '**Strong Text** ',
        'fa fa-italic': '_Emphasized Text_ ',
        'fa fa-quote-left': '> Block Quote ',
        'fa fa-link': '[Link]()' ,
        'fa fa-picture-o': '![Alt Text]() ',
        'fa fa-list-ol': '1. List Item ',
        'fa fa-list': '- List Item ',
        'fa fa-code': '`Inline Code` '
    }

    addToText = (buttonMarkdown) => {
        let currentInput = this.props.input;

        let start = this.props.selectionStart;
        let end = this.props.selectionEnd;
        let newInput = currentInput.substring(0, start) + buttonMarkdown + currentInput.substring(end);

        let addToStart = buttonMarkdown.substring(0).search(/[A-Za-z]/);

        // TODO: Change function name
        let andToEnd = () => {
            let length = buttonMarkdown.length - 1;

            for (let index = length; index >= 0; index--) {
                let currentChar = buttonMarkdown[index];

                if (!currentChar.search(/[A-Za-z]/)) {
                return index + 1;
                }
            }
        };

        this.props.updateState(newInput, start + addToStart, start + andToEnd());
    
        // DRY store this function somewhere else - currently being used in the toolbar and editor
        setTimeout(() => {
            this.props.undoRedo.addStep();
        });
    }

    render() {
        const icons = Object.keys(this.buttonMarkdown).map(key => {
            return <i
            key = {key}
            className = {key}
            onClick = {this.addToText.bind(this, this.buttonMarkdown[key])}
            ></i>
        })

        return (
            <div>{icons}</div>
        );
    }
}

export default Toolbar;
