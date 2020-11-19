const bel = require('bel')
const csjs = require('csjs-inject')
const path = require('path')
const filename = path.basename(__filename)
const button = require('..')
const svg = require('datdot-ui-graphic')


function demoComponent() {
    let count = 1
    let number = 0
    let recipients = []
    // logs
    const terminal = bel`<div class=${css.terminal}></div>`
    // icons
    const iconCancel = svg( { css: `${css.icon} ${css['icon-cancel']}`, path: 'assets/cancel.svg' })
    const iconClear = svg( { css: `${css.icon} ${css['icon-clear']}`, path: 'assets/cancel.svg' })
    const iconClear1 = svg( { css: `${css.icon} ${css['icon-clear']}`, path: 'assets/cancel.svg' })
    const iconCheck = svg( { css: `${css.icon} ${css['icon-check']}`, path: 'assets/check.svg' })
    const iconPlus = svg( { css: `${css.icon} ${css['icon-plus']}`, path: 'assets/plus.svg' })
    const iconPlus1 = svg( { css: `${css.icon} ${css['icon-plus']}`, path: 'assets/plus.svg' })
    const iconPlus2 = svg( { css: `${css.icon} ${css['icon-plus']}`, path: 'assets/plus.svg' })
    const iconMinus= svg( { css: `${css.icon} ${css['icon-plus']}`, path: 'assets/minus.svg' })
    const iconMinus1= svg( { css: `${css.icon} ${css['icon-plus']}`, path: 'assets/minus.svg' })
    const iconOption = svg( { css: `${css.icon} ${css['icon-option']}`, path: 'assets/option.svg' })
    // default buttons
    const confirm = button({page: 'JOBS', name: 'confirm', content: 'Confirm', style: 'solid', color: 'black'}, protocol('confirm'))
    const cancel = button({page: 'JOBS', name: 'cancel', content: 'Cancel', style: 'outlined', color: 'border-grey'}, protocol('cancel'))
    const previous = button({page: 'JOBS', name: 'previous', content: 'Previous', style: 'outlined', color: 'border-white'}, protocol('cancel'))
    const plan1 = button({page: 'JOBS', name: 'plan1', content: 'Plan1', style: 'solid', color: 'list', current: true}, plansProtocol('plan1'))
    const plan2 = button({page: 'JOBS', name: 'plan2', content: 'Plan2', style: 'solid', color: 'list', current: false}, plansProtocol('plan2'))
    const plan3 = button({page: 'JOBS', name: 'plan3', content: 'Plan3', style: 'solid', color: 'list', current: false}, plansProtocol('plan3'))
    // icon buttons
    const cancel1 = button({page: 'JOBS', name: 'cancel', content: iconCancel, style: 'solid', color: 'grey'}, protocol('cancel'))
    const confirm1 = button({page: 'JOBS', name: 'confirm', content: iconCheck, style: 'solid', color: 'black'}, protocol('confirm'))
    const clear = button({page: 'PLANS', name: 'clear', content: iconClear, style: ['circle-solid', 'small'], color: 'light-grey'}, protocol('cancel'))
    const create = button({page: 'JOBS', name: 'create', content: iconPlus, style: 'solid', color: 'black'}, protocol('create'))
    const option = button({page: 'JOBS', name: 'option', content: iconOption, style: 'default', color: 'fill-grey'}, protocol('option'))
     // increment and decrement buttons
    const minus = button({page: 'JOBS', name: 'decrement', content: iconMinus, style: 'default', color: 'stroke-black'}, protocol('decrement'))
    const minusDisabled = button({page: 'JOBS', name: 'decrement', content: iconMinus1, style: 'default', color: 'stroke-black', disabled: true}, protocol('decrement'))
    const plus = button({page: 'JOBS', name: 'increment', content: iconPlus2, style: 'default', color: 'stroke-black'}, protocol('increment'))
    // link buttons
    const linkCancel = button({page: 'PLANS', name: 'cancel', content: 'Cancel', style: 'link', color: 'link-grey'}, protocol('cancel'))
    const link1 = button({page: 'PLANS', name: 'link1', content: 'Link1', style: 'link', color: 'link-blue'}, protocol('link1'))
    // disabled buttons
    const confirmDisabled = button({page: 'JOBS', name: 'confirm', content: 'Confirm', style: 'solid', color: 'black', disabled: true}, protocol('confirm'))
    const clearDisabled = button({page: 'PLANS', name: 'clear', content: iconClear1, style: ['circle-solid', 'small'], color: 'light-grey', disabled: true}, protocol('cancel'))
    const createDisabled = button({page: 'JOBS', name: 'create', content: iconPlus1, style: 'solid', color: 'black', disabled: true}, protocol('create'))
    const plansList = bel`<div class=${css.plansList}>${plan1}${plan2}${plan3}</div>`
    const plans = plansList.children
    // location buttons
    const location1 = button({page: 'JOBS', name: 'central-europe', content: 'Central Europe', style: 'rounded', color: 'transparent', current: true}, locationsProtocol('central-europe'))
    const location2 = button({page: 'JOBS', name: 'eastern-europe', content: 'Eastern Europe', style: 'rounded', color: 'transparent', current: false}, locationsProtocol('eastern-europe'))
    const locationsList = bel`<div class=${css.locationsList}>${location1}</div>`
    
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
                ${create}
                ${clear}
                ${option}
                ${minus}
                ${plus}
            </div>
            <div>
                <h3>Link</h3>
                ${linkCancel}
                ${link1}
            </div>
            <div>
                <h3>Disabeld</h3>
                ${confirmDisabled}
                ${clearDisabled}
                ${createDisabled}
                ${minusDisabled}
            </div>
            <div>
                <h3>Plans list</h3>
                ${plansList}
            </div>
            <div>
                <h3>Options</h3>
                ${locationsList}
            </div>
        </section>
        ${terminal}
    </div>`

    // always be on bottom when displaying a lots elements 
    window.addEventListener('DOMContentLoaded', () => {
        terminal.scrollTop = terminal.scrollHeight
    })

    return element

    function locationsProtocol (name) {
        return send => {
            send(({page: 'JOBS', from: name, flow: 'ui-button', type: 'ready', filename, line: 103}))
            domlog({page: 'JOBS', from: name, flow: 'ui-button', type: 'ready', filename, line: 104})
            return plansReceive
        }
    }

    function plansProtocol (name) {
        return send => {
            send(({page: 'JOBS', from: name, flow: 'ui-button', type: 'ready', filename, line: 111}))
            domlog({page: 'JOBS', from: name, flow: 'ui-button', type: 'ready', filename, line: 112})
            return plansReceive
        }
    }

    // addtion and Subtraction
    function actionIncrement (from) {
        number++
        return domlog({page: 'JOBS', from, flow: 'ui-button', type: 'number', body: number, filename, line: 120})
    }

    function actionDecrement (from) {
        if (number < 1 ) return
        number--
        return domlog({page: 'JOBS', from, flow: 'ui-button', type: 'number', body: number, filename, line: 125})
    }

    function calculate (from) {
        (from === 'increment') ? actionIncrement(from) : actionDecrement (from)
        
    }
    // original protocol for all use
    function protocol (name) {
        return send => {
            send(({page: 'JOBS', from: name, flow: 'ui-button', type: 'ready', filename, line: 134}))
            domlog({page: 'JOBS', from: name, flow: 'ui-button', type: 'ready', filename, line: 135})
            return receive
        }
    }

    // Plans list
    function plansReceive (message) {
        const { page, from, flow, type, action, body, filename, line } = message
        if ( type === 'click') {
            [...plans].forEach( btn => {
                btn.classList.remove( [...btn.classList][3] )
                if ( btn.getAttribute('name') === from ) {
                    btn.classList.add(css.current)

                }
            } )
        }
        domlog(message)
    }

    function receive (message) {
        const { page, from, flow, type, action, body, filename, line } = message
        if ( type === 'click') {
            calculate(from)
        }
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
.icon-plus {}
.icon-option {}
.plansList {

}
.current {
    color: #fff;
    background-color: #333;
}
`

document.body.append( demoComponent() )