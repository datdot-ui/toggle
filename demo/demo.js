const bel = require('bel')
const csjs = require('csjs-inject')
const path = require('path')
const filename = path.basename(__filename)
const button = require('..')

function demoComponent() {
    let count = 1
    const terminal = bel`<div class=${css.terminal}></div>`
    const confirm = button({page: 'JOBS', name: 'confirm', title: 'Confirm', style: 'solid'}, protocol('confirm'))
    const cancel = button({page: 'JOBS', name: 'cancel', title: 'Cancel', style: 'outlined'}, protocol('cancel'))
    const element = bel`
    <div class=${css.wrap}>
        <div class=${css.container}>
            ${confirm}
            ${cancel}
        </div>
        ${terminal}
    </div>`

    return element

    function protocol (name) {
        return send => {
            send(({page: 'JOBS', flow: 'ui-button', type: 'ready', filename, line: 15}))
            domlog({page: 'JOBS', flow: 'ui-button', type: 'ready', filename, line: 15})
            return receive
        }
    }
    
    function receive (message) {
        const { page, from, flow, type, action, body, filename, line } = message
        domlog(message)
    }
    
    function domlog (message) {
        const { page, from, flow, type, body, action, filename, line } = message
        const log = bel`
        <div class=${css.log} role="log">
            <div class=${css.badge}>${count}</div>
            <div class=${css.output}>${page}/${flow}: ${from} ${type} ${body}</div>
            <div class=${css['code-line']}>${filename}:${line}</div>
        </div>`
        // console.log( message )
        terminal.append(log)
        terminal.scrollTop = terminal.scrollHeight
        count++
    }
}

const css = csjs`
body {
    margin: 0;
    padding: 0;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
    background-color: #F2F2F2;
    height: 100%;
}
.wrap {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 75vh 25vh;
}
.container {
    padding: 25px;
}
.container > button {
    margin-right: 25px;
}
.terminal {
    background-color: #212121;
    color: #f2f2f2;
    font-size: 13px;
    overflow-y: auto;
}
.log:last-child {
    color: #FFF500;
    font-weight: bold;
    
}
.log {
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    padding: 2px 12px 0 0;
    border-bottom: 1px solid #333;
}
.output {

}
.badge {
    background-color: #333;
    padding: 6px;
    margin-right: 10px;
    font-size: 14px;
    display: inline-block;
}
.code-line {

}
`

document.body.append( demoComponent() )