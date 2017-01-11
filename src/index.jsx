// import React from 'react';
// import ReactDOM from 'react-dom';
//
// import App from './components/app.jsx';
//
// ReactDOM.render(
//     <App />,
//     document.getElementById('app')
// );

import Element from './lib/element.js'

const DOM = Element('ul',{id: 'app'}, [
  Element('li', {key: '1'}, ['one']),
  Element('li', {key: '2'}, ['two']),
  Element('li', {key: '3'}, ['three']),
])
