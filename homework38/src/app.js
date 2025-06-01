import React from 'react';
import ReactDom from 'react-dom/client';

export const Button = ({ text, handleclick }) => {
    return <span>
        <button type="button" onClick={handleclick}>{text}</button>
    </span>
}

export class ClassButton extends React.Component {
    
    clicked() {
        console.log('Button has been clicked');
    }

    render() {
        const {text} = this.props;

        return <span>
            <button type="button" onClick={this.clicked}>{text}</button>
        </span>
    }
}
