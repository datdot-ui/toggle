const bel = require('bel')
const csjs = require('csjs-inject')
const path = require('path')
const filename = path.basename(__filename)
const button = require('..')
const svg = require('datdot-ui-graphic')
const domlog = require('ui-domlog')

function demoComponent() {
    let count = 1
    let number = 0
    let recipients = []
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
    const confirm = button({page: 'JOBS', name: 'confirm', content: 'Confirm', style: 'solid', color: 'black', custom: [css.customColor, css.customBackgroundColor]}, protocol('confirm'))
    const click = button({page: 'JOBS', name: 'confirm', content: 'Click', style: 'solid', color: 'white'}, protocol('click'))
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
    const linkCancel = button({page: 'PLANS', name: 'cancel', content: 'Cancel', style: 'link', color: 'link-cancel'}, protocol('cancel'))
    const link1 = button({page: 'PLANS', name: 'link1', content: 'Link1', style: 'link', color: 'link-blue'}, protocol('link1'))
    // disabled buttons
    const confirmDisabled = button({page: 'JOBS', name: 'confirm', content: 'Confirm', style: 'solid', color: 'black', disabled: true}, protocol('confirm'))
    const clearDisabled = button({page: 'PLANS', name: 'clear', content: iconClear1, style: ['circle-solid', 'small'], color: 'light-grey', disabled: true}, protocol('cancel'))
    const createDisabled = button({page: 'JOBS', name: 'create', content: iconPlus1, style: 'solid', color: 'black', disabled: true}, protocol('create'))
    const plansList = bel`<div class=${css.plansList}>${plan1}${plan2}${plan3}</div>`
    const plans = plansList.children
    // location buttons
    const location1 = button({page: 'JOBS', name: 'central-europe', content: 'Central Europe', style: 'option', color: 'link-grey', current: true}, locationProtocol('central-europe'))
    const location2 = button({page: 'JOBS', name: 'eastern-europe', content: 'Eastern Europe', style: 'option', color: 'link-grey'}, locationProtocol('eastern-europe'))
    const location3 = button({page: 'JOBS', name: 'northern-europe', content: 'Northern Europe', style: 'option', color: 'link-grey'}, locationProtocol('northern-europe'))
    const locationList = bel`<div class=${css.locationList}>${location1}${location2}${location3}</div>`
    const locations = locationList.children
    // navgation buttons
    const nav1 = button({page: 'PLANS', name: 'user', content: 'USER', style: 'nav', color: 'white'}, navgationProtocol('user'))
    const nav2 = button({page: 'PLANS', name: 'plans', content: 'PLANS', style: 'nav', color: 'white', current: true}, navgationProtocol('plans'))
    const nav3 = button({page: 'PLANS', name: 'jobs', content: 'JOBS', style: 'nav', color: 'white'}, navgationProtocol('jobs'))
    const nav4 = button({page: 'PLANS', name: 'apps', content: 'APPS', style: 'nav', color: 'white'}, navgationProtocol('apps'))
    const navgation = bel`<nav class=${css.nav}>${nav1}${nav2}${nav3}${nav4}</nav>`
    const navs = navgation.children

    // content
    const content = bel`
    <div class=${css.content}>
            <div>
                <h3>Text</h3>
                ${confirm}
                ${cancel}
                ${previous}
                ${click}
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
                <h3>Location list</h3>
                ${locationList}
            </div>
            <div>
                <h3>Navgation</h3>
                ${navgation}
            </div>
        
    </div>`

    // show logs
    let terminal = bel`<div class=${css.terminal}></div>`
    // container
    const container = wrap(content, terminal)
    return container

    function wrap (content) {
        const container = bel`
        <div class=${css.wrap}>
            <section class=${css.container}>
                ${content}
            </section>
            ${terminal}
        </div>
        `
        return container
    }

    function navgationProtocol (name) {
        return send => {
            recipients[name] = send
            send({page: 'JOBS', from: name, flow: 'ui-button', type: 'ready', filename, line: 133})
            const log = {page: 'JOBS', from: name, flow: 'ui-button', type: 'ready', filename, line: 134}
            showLog(log)
            return navgationReceive
        }
    }

    function locationProtocol (name) {
        return send => {
            recipients[name] = send
            send({page: 'JOBS', from: name, flow: 'ui-button', type: 'ready', filename, line: 143})
            const log = {page: 'JOBS', from: name, flow: 'ui-button', type: 'ready', filename, line: 144}
            showLog(log)
            return locationReceive
        }
    }

    function plansProtocol (name) {
        return send => {
            recipients[name] = send
            send({page: 'JOBS', from: name, flow: 'ui-button', type: 'ready', filename, line: 153})
            const log = {page: 'JOBS', from: name, flow: 'ui-button', type: 'ready', filename, line: 154}
            showLog(log)
            return plansReceive
        }
    }

    // addtion and Subtraction
    function actionIncrement (from) {
        number++
        const log = {page: 'JOBS', from, flow: 'ui-button', type: 'number', body: number, filename, line: 163}
        showLog(log)
    }

    function actionDecrement (from) {
        if (number < 1 ) return
        number--
        const log = {page: 'JOBS', from, flow: 'ui-button', type: 'number', body: number, filename, line: 170}
        showLog(log)
    }

    function calculate (from) {
        (from === 'increment') ? actionIncrement(from) : actionDecrement (from)
    }
    // original protocol for all use
    function protocol (name) {
        return send => {
            recipients[name] = send
            send({page: 'JOBS', from: name, flow: 'ui-button', type: 'ready', filename, line: 181})
            const log = {page: 'JOBS', from: name, flow: 'ui-button', type: 'ready', filename, line: 182}
            showLog(log)
            return receive
        }
    }

    // navgation menu
    function navgationReceive (message) {
        const { page, from, flow, type, action, body, filename, line } = message
        showLog(message)
        if ( type === 'click') {
            [...navs].forEach( btn => {
                btn.classList.remove( [...btn.classList][3] )
                if ( btn.getAttribute('name') === from ) {
                    recipients[from]({page, from, type: 'active'})
                    const log = { page, from, flow, type: 'active', body, filename, line: 197}
                    showLog(log)
                }
            } )
        }
    }
    // location list
    function locationReceive (message) {
        const { page, from, flow, type, action, body, filename, line } = message
        showLog(message)
        if ( type === 'click') {
            [...locations].forEach( btn => {
                btn.classList.remove( [...btn.classList][3] )
                if ( btn.getAttribute('name') === from ) {
                    recipients[from]({page, from, type: 'active'})
                    const log = { page, from, flow, type: 'active', body, filename, line: 212}
                    showLog(log)
                }
            } )
        }
    }

    // Plans list
    function plansReceive (message) {
        const { page, from, flow, type, action, body, filename, line } = message
        showLog(message)
        if ( type === 'click') {
            [...plans].forEach( btn => {
                btn.classList.remove( [...btn.classList][3] )
                if ( btn.getAttribute('name') === from ) {
                    recipients[from]({page, from, type: 'active'})
                    const log = { page, from, flow, type: 'active', body, filename, line: 228}
                    showLog(log)
                }
            } )
        }
    }

    function receive (message) {
        const { page, from, flow, type, action, body, filename, line } = message
        if ( type === 'click') {
            calculate(from)
        }
        showLog(message)
    }

    // keep the scroll on bottom when the log displayed on the terminal
    function showLog (message) { 
        sendMessage(message)
        .then( log => {
            terminal.append(log)
            terminal.scrollTop = terminal.scrollHeight
        }
    )}

    async function sendMessage (message) {
        return await new Promise( (resolve, reject) => {
            if (message === undefined) reject('no message import')
            const log = domlog(message)
            return resolve(log)
        }).catch( err => { throw new Error(err) } )
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
    overflow-y: auto;
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
.plansList {}
.locationList {}
.customColor {
    color: #e0fbfc;
}
.customBackgroundColor {
    background-color: #457b9d;
}
.nav {
    width: 50%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
}
.nav button {
    margin-right: 0 !important;
}
`

document.body.append( demoComponent() )