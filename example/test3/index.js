
import el from '../../src/lib/element.js'
import diff from '../../src/lib/diff.js'
import patch from '../../src/lib/patch.js'

/** @jsx el */
var tree = (
  <div>
    <div>test for jsx</div>
    <ul>
      <li>one</li>
      <li>two</li>
      <li>three</li>
    </ul>
  </div>
)

var root = tree.render()
document.body.appendChild(root)

var newTree = (
  <div>
    <div style='color: blue'>test for jsx</div>
    <ul>
      <li>two</li>
      <li>three</li>
      <li>one</li>
    </ul>
  </div>
)

setTimeout(function(){
  var patches = diff(tree, newTree)

  patch(root, patches)
}, 5000)
