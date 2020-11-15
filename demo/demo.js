const bel = require('bel')
const csjs = require('csjs-inject')
const path = require('path')
const filename = path.basename(__filename)
const button = require('..')
const svg = require('../src/node_modules/svg')


function demoComponent() {
    let count = 1
    // logs
    const terminal = bel`<div class=${css.terminal}></div>`
    // icons
    const iconCancel = svg( { css: `${css.icon} ${css['icon-cancel']}`, path: 'assets/cancel.svg' })
    const iconClear = svg( { css: `${css.icon} ${css['icon-clear']}`, path: 'assets/cancel.svg' })
    const iconCheck = svg( { css: `${css.icon} ${css['icon-check']}`, path: 'assets/check.svg' })
    // buttons
    const confirm = button({page: 'JOBS', name: 'confirm', content: 'Confirm', style: 'solid', color: 'dark'}, protocol('confirm'))
    const cancel = button({page: 'JOBS', name: 'cancel', content: 'Cancel', style: 'outlined', color: 'border-grey'}, protocol('cancel'))
    const cancel1 = button({page: 'JOBS', name: 'cancel', content: iconCancel, style: 'solid', color: 'grey'}, protocol('cancel'))
    const linkCancel = button({page: 'PLANS', name: 'cancel', content: 'Cancel', style: 'link', color: 'link-grey'}, protocol('cancel'))
    const previous = button({page: 'JOBS', name: 'previous', content: 'Previous', style: 'outlined', color: 'border-white'}, protocol('cancel'))
    const confirm1 = button({page: 'JOBS', name: 'confirm', content: iconCheck, style: 'solid', color: 'dark'}, protocol('confirm'))
    const clear = button({page: 'PLANS', name: 'clear', content: iconClear, style: ['circle-solid', 'small'], color: 'light-grey'}, protocol('cancel'))
    
    const element = bel`
    <div class=${css.wrap}>
        <section class=${css.container}>
            <div>
                <h3>Text</h3>
                ${confirm}
                ${cancel}
                ${previous}
            </div>
            <div>
                <h3>Icon</h3>
                ${confirm1}
                ${cancel1}
                ${clear}
            </div>
            <div>
                <h3>Link</h3>
                ${linkCancel}
            </div>
        </section>
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
    background-color: rgba(0, 0, 0, .1);
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
.container > div {
    margin-bottom: 20px;
}
.container > div button {
    margin-right: 10px;
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
.code-line {}
.icon {
    width: 16px;
}
.icon-cancel {}
.icon-clear {}
.icon-check {}
`

document.body.append( demoComponent() )