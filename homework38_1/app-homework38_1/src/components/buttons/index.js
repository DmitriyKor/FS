import React from 'react';
import ReactDom from 'react-dom/client';

export default function Button ({ text }) {
     const handleclick = () => {
        console.log('Button has been clicked');
    }
    
    return <span>
        <button type="button" onClick={handleclick}>{text}</button>
    </span>
}