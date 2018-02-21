import React from 'react';
import ReactDom from 'react-dom';
import App from './component/app/app'

const container = document.createElement('div');
document.body.appendChild(container);
// vinicio - this is the only line that uses react-dom
ReactDom.render(<App />,container);