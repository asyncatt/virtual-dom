
import el from '../../src/lib/element.js'
import diff from '../../src/lib/diff.js'
import patch from '../../src/lib/patch.js'

var tree = el('div', {'id': 'container', 'className': 'testclass'}, [
    el('h1', {style: 'color: blue'}, ['simple virtal dom']),
    el('p', ['Hello, virtual-dom']),
    el('input', {'readOnly': false, 'value': 'false or true'}),
    el('ul', [el('li', {}, ['one'])])
])

var root = tree.render()
document.body.appendChild(root)

var newTree = el('div', {'id': 'container', 'className': 'classHasChanged'}, [
    el('h1', {style: 'color: red'}, ['simple virtal dom']),
    el('p', ['Hello, virtual-dom']),
    el('input', {'id': 'te', 'readOnly': true, 'value': 'false or true'}),
    el('ul', [el('li',{},['one']), el('li',{},['two'])])
])

setTimeout(function(){
  var patches = diff(tree, newTree)

  patch(root, patches)
}, 5000)
