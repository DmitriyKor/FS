import './styles/index.css';
import React from 'react';
import ReactDom from 'react-dom/client';

const rootEl = document.getElementById('header');
const virtualRootEl = ReactDom.createRoot(rootEl);

virtualRootEl.render(
    <p>Hello React</p>
);

console.log('OK');