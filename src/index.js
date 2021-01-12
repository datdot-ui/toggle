const bel = require('bel')
const csjs = require('csjs-inject')
const path = require('path')
const filename = path.basename(__filename)

module.exports = button

function button ({page, flow = null, name, content, style, color, custom, current, disabled = false}, protocol) {
    const widget = 'ui-button'
    const send2Parent = protocol( receive )
    send2Parent({page, from: name, flow: flow ? `${flow}/${widget}` : widget, type: 'init', filename, line: 11})
    let state
    
    let button = bel`<button role="button" class="${css.btn} ${ checkStyle() } ${color ? css[color] : ''} ${custom ? custom.join(' ') : ''} ${current ? css.current : '' }" name=${name} aria-label=${name} disabled=${disabled}>${content}</button>`
    button.onclick = click

    return button

    function checkStyle() {
        let arr = []
        if (Array.isArray(style)) {
            for (let i = 0; i < style.length; i++) {
                arr.push(css[style[i]])
            }
            return arr.join(' ')
        } 
        return css[style]
    }
    
    function click(e) {
        let x = e.clientX - e.target.offsetLeft
        let y = e.clientY - e.target.offsetTop
        let ripple = document.createElement('span')
        ripple.classList.add(css.ripple)
        ripple.style.left = `${x}px`
        ripple.style.top = `${y}px`

        button.append(ripple)
        setTimeout( () => { ripple.remove() }, 600)
        send2Parent({page, from: name, flow: flow ? `${flow}/${widget}` : widget, type: 'click', filename, line: 40})
    }

    function setState(update) {
        return state = update
    }

    function toggleActive (isActive, message) {
        const { page, from, flow } = message
        let newState = isActive ? setState('self-active') : setState('remove-active')
        button.classList.toggle(css.active)
        return send2Parent({page, flow, from, type: 'state', body: newState, filename, line: 51})
    }

    function receive(message) {
        const { type } = message
        // console.log('received from main component', message )
        if ( type === 'current-active' ) button.classList.add(css.current)
        if ( type === 'remove-current' ) button.classList.remove(css.current)
        if ( type === 'disabled' ) button.setAttribute('disabled', true)
        if ( type === 'active' ) toggleActive(true, message)
        if ( type === 'remove-active' ) toggleActive(false, message)
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
    transition: color .3s, background-color .3s, border .3s ease-in-out;
}
.btn svg g {
    transition: fill .3s linear;
}
.solid {
    color: #fff;
    font-weight: bold;
    border-radius: 8px;
}
.solid:hover {
    background-color: rgba(0, 0, 0, .8);
}
.solid [class^="icon"] path {
    stroke: #fff;
}
.outlined {
    border-radius: 8px;
}
.circle-solid {
    border-radius: 100%;
}
.circle-solid:hover {
    border-radius: 100%;
    background-color: #333;
}
.default {
    border-radius: 8px;
    background-color: transparent;
}
.fill-grey svg g {
    fill: #BBBBBB;
}
.fill-grey:hover {
    background-color: rgba(0, 0, 0, .75);
}
.fill-grey:hover svg g {
    fill: #fff;
}
.fill-dark svg g {
    fill: #333;
}
.fill-dark:hover {
    background-color: rgba(255,255,255, .5);
}
.fill-white svg g {
    fill: #fff;
}
.fill-white:hover {
    background-color: rgba(188,188,188, .5);
}
.stroke-black path {
    stroke: #000;
}
.stroke-grey path {
    stroke: #BBB;
}
.link {}
.link:hover {
    color: rgba(0, 0, 0, .6);
}
.link-black {
    color: #000;
}
.link-white {
    color: #fff;
}
.link-blue {
    color: #4BAFFF;
}
.link-blue:hover {
    color: #008af9;
}
.link-grey {
    color: #707070;
}
.link-grey:hover {
    color: #333;
}
.link-cancel {
    color: #9A9A9A;
}
.link.cancel:hover {
    background-color: transparent;
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
.transparent {
    background-color: transparent;
}
.black {
    color: #fff;
    background-color: #000;
}
.dark {
    color: #fff;
    background-color: #333;
}
.dark svg g {
    fill: #fff;
}
.dark.active {
    background-color: #000;
}
.grey {
    color: #fff;
    background-color: #9A9A9A;
}
.grey svg g {
    fill: #fff;
}
.white {
    color: #707070;
    background-color: #fff;
}
.white:hover {
    color: #fff;
    background-color: #d3d3d3;
}
.white.active svg g {
    fill: #fff;
}
.list {
    color: #707070;
    background-color: #DDD;
}
.list.current {
    color: #fff;
    background-color: #333;
}
.list:hover {
    color: #fff;
}
.light-grey {
    color: #fff;
    background-color: #BBBBBB;
}
.border-grey {
    color: #707070;
    border: 1px solid #707070;
}
.border-grey:hover {
    color: rgba(143, 143, 143, 1);
    border-color: rgba(143, 143, 143, .15);
    background-color: rgba(143, 143, 143, .15);
}
.border-white {
    color: #fff;
    border: 1px solid #fff;
}
.border-white:hover {
    background-color: rgba(255, 255, 255, .5);
}
svg {
    width: 100%;
    height: auto;
}
.circle-solid [class^="icon"] path {
    stroke: #fff;
}
.small {
    width: 30px;
    height: 30px;
    padding: 0;
}
.small [class^='icon'] {
    display: inline-block;
    padding-top: 2px;
}
.btn[disabled], .btn[disabled]:hover {
    color: #a9a9a9;
    background-color: rgba(217, 217, 217, 1);
    cursor: not-allowed;
}
.btn[disabled].default {
    background-color: transparent;
}
.btn[disabled].default:hover g {
    fill: #BBB;
}
.btn[disabled].default path {
    stroke: #BBB;
}
.current {}
.nav {
    padding: 0;
    line-height: 40px;
}
.nav.current {
    color: #242424;
    font-weight: bold;
    background-color: #F2F2F2;
}
.option {
    border: 2px solid rgba(255,255,255,0);
    border-radius: 18px;
    transition: border .6s, color .5s ease-in-out;
}
.option.current {
    font-size: 16px;
    font-weight: bold;
    color: #000;
    border: 2px solid rgba(0,0,0,1);
}
.active {
    color: #fff;
    background-color: #000;
}
.tab {
    padding: 15px;
    background-color: #D9D9D9;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    margin-right: 2px;
    color: #000;
    cursor: pointer;
    text-transform: capitalize;
}
.tab.current {
    background-color: #fff;
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