const bel = require('bel')
const csjs = require('csjs-inject')
const path = require('path')
const filename = path.basename(__filename)

module.exports = button

function button ({page, name = "button", title, style}, protocol) {
    const widget = 'ui-button'
    const send2Parent = protocol( receive )
    send2Parent({page, from: name, flow: widget, type: 'init', filename, line: 11})
    let button = bel`<button role="button" class="${css.btn} ${css[style]}" name=${name} aria-label=${name}>${title}</button>`
    button.onclick = click

    return button

    function click(e) {
        let x = e.clientX - e.target.offsetLeft
        let y = e.clientY - e.target.offsetTop
        let ripple = document.createElement('span')
        ripple.classList.add(css.ripple)
        ripple.style.left = `${x}px`
        ripple.style.top = `${y}px`

        button.append(ripple)
        setTimeout( () => { ripple.remove() }, 600)

        send2Parent({page, from: title, flow: widget, type: 'click', filename, line: 18})
    }

    function receive(message) {
        const {page, from, type, action, body} = message
        // console.log('received from main component', message )
    }
}


const css = csjs`
.btn {
    position: relative;
    border: none;
    background: transparent;
    padding: 15px 20px;
    font-size: 14px;
    cursor: pointer;
    outline: none;
    overflow: hidden;
    transition: background-color .25s, border .25s, color .25s ease-in-out;
}
.solid {
    color: #fff;
    font-weight: bold;
    background-color: #000;
    border-radius: 8px;
}
.solid:hover {
    background-color: rgba(0, 0, 0, .8);
}
.outlined {
    color: #707070;
    border: 1px solid #707070;
    border-radius: 8px;
}
.outlined:hover {
    color: rgba(255, 142, 142, 1);
    border-color: rgba(255, 142, 142, .15);
    background-color: rgba(255, 142, 142, .15);
}
.ripple {
    position: absolute;
    border-radius: 50%;
    background-color: #fff;
    transform: translate(-50%, -50%);
    pointer-events: none;
    -webkit-animation: ripples .6s linear infinite;
    animation: ripples .6s linear infinite;
}
@keyframes ripples {
    0% {
        width: 0px;
        height: 0px;
        opacity: .5;
    }
    100% {
        width: 500px;
        height: 500px;
        opacity: 0;
    }
}
`