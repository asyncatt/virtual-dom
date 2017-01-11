import React from 'react'
import ReactDOM from 'react-dom'

let data = [
  'one','two','three'
]

ReactDOM.render(
  <ul>
  {
    data.map(item=>{
      return (<li>{item}</li>)
    })
  }
  </ul>,
  document.getElementById('app')
);
