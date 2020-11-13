const bel = require('bel')
const csjs = require('csjs-inject')
const path = require('path')
const filename = path.basename(__filename)

module.exports = button

function button ({page, name = "button", title, style}, protocol) {
    const widget = 'ui-button'
    const send2Parent = protocol( receive )
    send2Parent({page, from: name, flow: widget, type: 'init', filename, line: 11})
    let button = bel`<button role="button" class="${css.btn} ${css[style]} ${css.ripple}" name=${name} aria-label=${name}>${title}</button>`
    button.onclick = click

    return button

    function click() {
        send2Parent({page, from: title, flow: widget, type: 'click', filename, line: 18})
    }

    function receive(message) {
        const {page, from, type, action, body} = message
        // console.log('received from main component', message )
    }
}


const css = csjs`
.btn {
    border: none;
    background: transparent;
    padding: 15px 20px;
    font-size: 14px;
    cursor: pointer;
    outline: none;
}
.solid {
    color: #fff;
    font-weight: bold;
    background-color: #000;
    border-radius: 8px;
}
.ripple {
    background-position: center;
    transition: background .8s;
}
.solid.ripple:hover {
    background: rgba(51,51,51,1) radial-gradient(circle, transparent 1%, rgba(0,0,0,1) 1%) center/15000%;
}
.solid.ripple:active {
    background-color: rgba(51,51,51, .8);
    background-size: 100%;
    transition: background 0s;
}
.outlined {
    color: #707070;
    border: 1px solid #707070;
    border-radius: 8px;
}
.outlined.ripple:hover {
    background: rgba(255,255,255, .1) radial-gradient(circle, transparent 1%, rgba(234,234,234, .5) 1%) center/15000%;
}
.outlined.ripple:active {
    background-color: rgba(255,255,255, .8);
    background-size: 100%;
    transition: background 0s;
}
@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`
