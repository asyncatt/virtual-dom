
import el from '../../src/lib/element.js'
import diff from '../../src/lib/diff.js'
import patch from '../../src/lib/patch.js'

/** @jsx el */
var tree = (
  <div>
    <div onClick={clickFn}>test for event</div>
  </div>
)

function clickFn() {
  alert('click')
}

var root = tree.render()
document.body.appendChild(root)
