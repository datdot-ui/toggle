const bel = require('bel')
const csjs = require('csjs-inject')
const path = require('path')
const filename = path.basename(__filename)
const button = require('..')
const svg = require('datdot-ui-graphic')
const domlog = require('ui-domlog')
const currentLine = require('current-line')

function demoComponent() {
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
    const click = button({page: 'JOBS', name: 'click', content: 'Click', style: 'solid', color: 'white'}, protocol('click'))
    const cancel = button({page: 'JOBS', name: 'cancel', content: 'Cancel', style: 'outlined', color: 'border-grey'}, protocol('cancel'))
    const previous = button({page: 'JOBS', name: 'previous', content: 'Previous', style: 'outlined', color: 'border-white'}, protocol('cancel'))
    const plan1 = button({page: 'JOBS', flow: 'plans', name: 'plan1', content: 'Plan1', style: 'solid', color: 'list', current: true}, plansProtocol('plan1'))
    const plan2 = button({page: 'JOBS', flow: 'plans', name: 'plan2', content: 'Plan2', style: 'solid', color: 'list', current: false}, plansProtocol('plan2'))
    const plan3 = button({page: 'JOBS', flow: 'plans', name: 'plan3', content: 'Plan3', style: 'solid', color: 'list', current: false}, plansProtocol('plan3'))
    // icon buttons
    const cancel1 = button({page: 'JOBS', name: 'icon-cancel', content: iconCancel, style: 'solid', color: 'grey'}, protocol('icon-cancel'))
    const save = button({page: 'JOBS', name: 'icon-save', content: iconCheck, style: 'solid', color: 'black'}, protocol('icon-save'))
    const clear = button({page: 'PLANS', name: 'icon-clear', content: iconClear, style: ['circle-solid', 'small'], color: 'light-grey'}, protocol('icon-cancel'))
    const create = button({page: 'JOBS', name: 'icon-create', content: iconPlus, style: 'solid', color: 'black'}, protocol('cicon-reate'))
    const option = button({page: 'JOBS', name: 'icon-option', content: iconOption, style: 'default', color: 'fill-grey'}, protocol('icon-option'))
    // increment and decrement buttons
    const minus = button({page: 'JOBS', flow: 'calculate', name: 'icon-decrement', content: iconMinus, style: 'default', color: 'stroke-black'}, protocol('icon-decrement'))
    const minusDisabled = button({page: 'JOBS', flow: 'calculate', name: 'icon-decrement-disabled', content: iconMinus1, style: 'default', color: 'stroke-black', disabled: true}, protocol('icon-decrement-disabled'))
    const plus = button({page: 'JOBS', flow: 'calculate', name: 'icon-increment', content: iconPlus2, style: 'default', color: 'stroke-black'}, protocol('icon-increment'))
    const calNumber = bel`<span class=${css.num}>${number}</span>`
    const calculateElement = bel`<div class=${css.calculate}>${minus}${calNumber}${plus}</div>`
    // link buttons
    const linkCancel = button({page: 'PLANS', name: 'link-cancel', content: 'Cancel', style: 'link', color: 'link-cancel'}, protocol('link-cancel'))
    const link1 = button({page: 'PLANS', name: 'link1', content: 'Link1', style: 'link', color: 'link-blue'}, protocol('link1'))
    // disabled buttons
    const disabled = button({page: 'JOBS', name: 'disabled', content: 'Disabled', style: 'solid', color: 'black', disabled: true}, protocol('disabled'))
    const clearDisabled = button({page: 'PLANS', name: 'icon-clear-disabled', content: iconClear1, style: ['circle-solid', 'small'], color: 'light-grey', disabled: true}, protocol('icon-clear-disabled'))
    const createDisabled = button({page: 'JOBS', name: 'icon-create-disabled', content: iconPlus1, style: 'solid', color: 'black', disabled: true}, protocol('icon-create-disabled'))
    const plansList = bel`<div class=${css.plansList}>${plan1}${plan2}${plan3}</div>`
    const plans = plansList.children
    // location buttons
    const location1 = button({page: 'JOBS', flow: 'location', name: 'central-europe', content: 'Central Europe', style: 'option', color: 'link-grey', current: true}, locationProtocol('central-europe'))
    const location2 = button({page: 'JOBS', flow: 'location', name: 'eastern-europe', content: 'Eastern Europe', style: 'option', color: 'link-grey'}, locationProtocol('eastern-europe'))
    const location3 = button({page: 'JOBS', flow: 'location', name: 'northern-europe', content: 'Northern Europe', style: 'option', color: 'link-grey'}, locationProtocol('northern-europe'))
    const locationList = bel`<div class=${css.locationList}>${location1}${location2}${location3}</div>`
    const locations = locationList.children
    // navigation buttons
    const nav1 = button({page: 'PLANS', flow: 'nav', name: 'user', content: 'USER', style: 'nav', color: 'white'}, navigationProtocol('user'))
    const nav2 = button({page: 'PLANS', flow: 'nav', name: 'plans', content: 'PLANS', style: 'nav', color: 'white', current: true}, navigationProtocol('plans'))
    const nav3 = button({page: 'PLANS', flow: 'nav', name: 'jobs', content: 'JOBS', style: 'nav', color: 'white'}, navigationProtocol('jobs'))
    const nav4 = button({page: 'PLANS', flow: 'nav', name: 'apps', content: 'APPS', style: 'nav', color: 'white'}, navigationProtocol('apps'))
    const navigation = bel`<nav class=${css.nav}>${nav1}${nav2}${nav3}${nav4}</nav>`
    const navs = navigation.children

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
                ${save}
                ${cancel1}
                ${create}
                ${clear}
                ${option}
                ${calculateElement}
            </div>
            <div>
                <h3>Link</h3>
                ${linkCancel}
                ${link1}
            </div>
            <div>
                <h3>Disabeld</h3>
                ${disabled}
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
                <h3>navigation</h3>
                ${navigation}
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

    function navigationProtocol (name) {
        return send => {
            recipients[name] = send
            return navigationReceive
        }
    }

    function locationProtocol (name) {
        return send => {
            recipients[name] = send
            return locationReceive
        }
    }

    function plansProtocol (name) {
        return send => {
            recipients[name] = send
            return plansReceive
        }
    }

    // addtion and Subtraction
    function actionIncrement (message) {
        let {from, flow} = message
        number++
        calNumber.textContent = number
        const log = {page: 'demo', from, flow: `calculate/${flow}`, type: 'number', body: number, filename, line: currentLine.get().line-2}
        showLog(log)
    }

    function actionDecrement (message) {
        let {from, flow} = message
        if (number <= 0 ) return showLog({page: 'demo', from, flow: 'calculate/ui-button', type: 'number', body: '0', filename, line: currentLine.get().line-2})
        number--
        calNumber.textContent = number
        const log = {page: 'demo', from, flow: `calculate/${flow}`, type: 'number', body: number, filename, line: currentLine.get().line-2}
        showLog(log)
    }

    // original protocol for all use
    function protocol (name) {
        return send => {
            recipients[name] = send
            return receive
        }
    }

    // navigation menu
    function navigationReceive (message) {
        let { page, from, flow, type, action, body } = message
        showLog(message)
        if (type === 'init') showLog({page: 'demo', from, flow, type: 'ready', body, filename, line: currentLine.get().line -2})
        if (type === 'click') {
            [...navs].forEach( btn => {
                btn.classList.remove( [...btn.classList][3] )
                if ( btn.getAttribute('name') === from ) {
                    recipients[from]({page, from, type: 'active'})
                    const message = { page, from, flow, type: 'active', body, filename, line: currentLine.get().line-2}
                    showLog(message)
                }
            } )
        }
    }
    // location list
    function locationReceive (message) {
        let { page, from, flow, type, action, body } = message
        showLog(message)
        if (type === 'init') showLog({page: 'demo', from, flow, type: 'ready', body, filename, line: currentLine.get().line -2})
        if (type === 'click') {
            [...locations].forEach( btn => {
                btn.classList.remove( [...btn.classList][3] )
                if ( btn.getAttribute('name') === from ) {
                    recipients[from]({page, from, type: 'active'})
                    const message = { page, from, flow, type: 'active', body, filename, line: currentLine.get().line-2}
                    showLog(message)
                }
            } )
        }
    }

    // Plans list
    function plansReceive (message) {
        let { page, from, flow, type, action, body } = message 
        showLog(message)
        if (type === 'init') showLog({page: 'demo', from, flow, type: 'ready', body, filename, line: currentLine.get().line -2})
        if (type === 'click') {
            [...plans].forEach( btn => {
                btn.classList.remove( [...btn.classList][3] )
                if ( btn.getAttribute('name') === from ) {
                    recipients[from]({page, from, type: 'active'})
                    const log = { page, from, flow, type: 'active', body, filename, line: currentLine.get().line - 2}
                    showLog(log)
                }
            } )
        }
    }

    function receive (message) {
        const { page, from, flow, type, action, body } = message
        showLog(message)
        if (type === 'init') showLog({page: 'demo', from, flow, type: 'ready', body, filename, line: currentLine.get().line - 2})
        if (type === 'click') {
            if (from === 'icon-increment') actionIncrement(message)
            if (from === 'icon-decrement') actionDecrement(message)
        }   
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
.calculate {}
.num {
    font-size: 16px;
    font-weight: bold;
    padding: 0 12px;
}
`

document.body.append( demoComponent() )