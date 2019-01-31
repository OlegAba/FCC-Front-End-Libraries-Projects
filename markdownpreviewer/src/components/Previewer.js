import React, { Component } from 'react';
import './Previewer.css';

// TODO: Turn into functional based component

class Previewer extends Component {

    getMarkedHtml = (input) => {
        var marked = require("marked");
        var renderer = new marked.Renderer();

        renderer.link = (href, title, text) => {
            return `<a target="_blank" href="${ href }" title="${ title }">${ text }</a>`
        }

        marked.setOptions({
            renderer: renderer,
            gfm: true,
            breaks: true
        });

        let markedHtml = marked(input);
        return { __html : markedHtml };
    }

    render() {
        return (
            <div id = "preview"
            dangerouslySetInnerHTML={ this.getMarkedHtml(this.props.input) }>
            </div>
        );
    }
}

export default Previewer;
