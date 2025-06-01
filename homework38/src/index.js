import './styles/index.css';
import React from 'react';
import ReactDom from 'react-dom/client';
import {Button, ClassButton} from './app.js';

const rootEl = document.getElementById('header');
const virtualRootEl = ReactDom.createRoot(rootEl);

function handleClick(e) {
    console.log('Click event');
}
//virtualRootEl.render(<Button text="Click this button" handleclick={handleClick}></Button>);
virtualRootEl.render(<ClassButton text="Click this button"></ClassButton>);

console.log('OK');