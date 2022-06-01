const protocol_maker = require('protocol-maker')
const i_icon = require('datdot-ui-icon')

var id = 0
var icon_count = 0
const sheet = new CSSStyleSheet()
const default_state = { 
    opts: {
        expanded: false, 
        current: false, 
        selected: false, 
        disabled: false,
        theme: [sheet]
    },
    // contacts: {}
}

module.exports = button

function button (opts, parent_wire) {
    const {name = 'i-button', title, icons = [], state = default_state, theme = ``} = opts
    // protocol
    const initial_contacts = { 'parent': parent_wire }
    const contacts = protocol_maker('input-number', listen, initial_contacts)

    function listen (msg) {
        const { head, refs, type, data, meta } = msg // receive msg
        const [from, to, msg_id] = head
        const cases = {
            'update': () => handle_update(data)
        }
       const handler = cases[type] || default_handler
       function default_handler () {
           console.log('This type is not supported')
       }
    }
    // make button
    const el = document.createElement('i-button')
    const shadow = el.attachShadow({mode: 'closed'})

    icons.forEach(icon => {
        shadow.append(i_icon({ name: icon.name, path: icon.path}, contacts.add(`${icon.name}-${icon_count++}`)))
    })
    if (title) {
        const text = document.createElement('span')
        text.className = 'text'
        text.append(title)
        shadow.append(text)
    }

    if (!state.disabled) el.onclick = handle_click
    el.setAttribute('aria-label', name)
    el.setAttribute('tabindex', 0) // indicates that its element can be focused, and where it participates in sequential keyboard navigation 

    const custom_css = new CSSStyleSheet()
    custom_css.replaceSync(theme)
    shadow.adoptedStyleSheets = [sheet, custom_css]

    return el

    // helpers
    function handle_update (data) {
        const { theme, aria } = data
        if (aria) el.setAttribute(`aria-${aria.type}`, aria.value)
    }

    function handle_changed_event (data) {
        const {text, cover, icon, title} = data
        // new element
        const new_text = document.createElement('span')
        new_text.className = 'text'
        const new_avatar = document.createElement('span')
        new_avatar.className = 'avatar'
        // old element
        const old_icon = shadow.querySelector('.icon')
        const old_avatar = shadow.querySelector('.avatar')
        const old_text = shadow.querySelector('.text')
        // change content for button or switch or tab
        if (role.match(/button|switch|tab/)) {
            el.setAttribute('aria-label', text || title)
            if (text) {
                if (old_text) old_text.textContent = text
            } else {
                if (old_text) old_text.remove()
            }
            if (icon) {
                const new_icon = i_icon({ name: icon.name, path: icon.path}, contacts.add(`${icon.name}-${icon_count++}`))
                if (old_icon) old_icon.parentNode.replaceChild(new_icon, old_icon)
                else shadow.insertBefore(new_icon, shadow.firstChild)
            } else {
                if (old_icon) old_icon.remove()
            }
        }
        // change content for listbox
        if (role.match(/listbox/)) {
            listbox.innerHTML = ''
            if (icon) {
                const new_icon = i_icon({ name: icon.name, path: icon.path}, contacts.add(`${icon.name}-${icon_count++}`))
                if (role.match(/listbox/)) listbox.append(new_icon)
            }
            if (text) {
                new_text.append(text)
                if (role.match(/listbox/)) listbox.append(new_text)
            }
        } 
    }
    // button click
    function handle_click () {
        const $parent = contacts.by_name['parent']
        const type = 'click'
    }

}

sheet.replaceSync(`
:root {
    --b: 0, 0%;
    --r: 100%, 50%;
    --color-white: var(--b), 100%;
    --color-black: var(--b), 0%;
    --color-dark: 223, 13%, 20%;
    --color-deep-black: 222, 18%, 11%;
    --color-blue: 214, var(--r);
    --color-red: 358, 99%, 53%;
    --color-amaranth-pink: 331, 86%, 78%;
    --color-persian-rose: 323, 100%, 56%;
    --color-orange: 35, 100%, 58%;
    --color-deep-saffron: 31, 100%, 56%;
    --color-ultra-red: 348, 96%, 71%;
    --color-flame: 15, 80%, 50%;
    --color-verdigris: 180, 54%, 43%;
    --color-maya-blue: 205, 96%, 72%;
    --color-slate-blue: 248, 56%, 59%;
    --color-blue-jeans: 204, 96%, 61%;
    --color-dodger-blue: 213, 90%, 59%;
    --color-light-green: 127, 86%, 77%;
    --color-lime-green: 127, 100%, 40%;
    --color-slimy-green: 108, 100%, 28%;
    --color-maximum-blue-green: 180, 54%, 51%;
    --color-green: 136, 81%, 34%;
    --color-light-green: 97, 86%, 77%;
    --color-lincoln-green: 97, 100%, 18%;
    --color-yellow: 44, 100%, 55%;
    --color-chrome-yellow: 39, var(--r);
    --color-bright-yellow-crayola: 35, 100%, 58%;
    --color-green-yellow-crayola: 51, 100%, 83%;
    --color-purple: 283, var(--r);
    --color-medium-purple: 269, 100%, 70%;
    --color-grey33: var(--b), 20%;
    --color-grey66: var(--b), 40%;
    --color-grey70: var(--b), 44%;
    --color-grey88: var(--b), 53%;
    --color-greyA2: var(--b), 64%;
    --color-greyC3: var(--b), 76%;
    --color-greyCB: var(--b), 80%;
    --color-greyD8: var(--b), 85%;
    --color-greyD9: var(--b), 85%;
    --color-greyE2: var(--b), 89%;
    --color-greyEB: var(--b), 92%;
    --color-greyED: var(--b), 93%;
    --color-greyEF: var(--b), 94%;
    --color-greyF2: var(--b), 95%;
    --transparent: transparent;
    --define-font: *---------------------------------------------*;
    --snippet-font: Segoe UI Mono, Monospace, Cascadia Mono, Courier New, ui-monospace, Liberation Mono, Menlo, Monaco, Consolas;
    --size12: 1.2rem;
    --size14: 1.4rem;
    --size16: 1.6rem;
    --size18: 1.8rem;
    --size20: 2rem;
    --size22: 2.2rem;
    --size24: 2.4rem;
    --size26: 2.6rem;
    --size28: 2.8rem;
    --size30: 3rem;
    --size32: 3.2rem;
    --size36: 3.6rem;
    --size40: 4rem;
    --weight100: 100;
    --weight300: 300;
    --weight400: 400;
    --weight600: 600;
    --weight800: 800;
    --primary-color: var(--color-black);
    --primary-bg-color: var(--color-greyF2);
    --primary-font: Arial, sens-serif;
    --primary-size: var(--size16);
    --primary-input-radius: 8px;
    --primary-button-radius: 8px;
}
:host(i-button) {
    --size: var(--primary-size);
    --weight: var(--weight300);
    --color: var(--primary-color);
    --color-focus: var(--primary-color-focus);
    --bg-color: var(--primary-bg-color);
    --bg-color-focus: var(--primary-bg-color-focus);
    --opacity: 1;
    --padding: 12px;
    --margin: 0;
    --border-width: 0px;
    --border-style: solid;
    --border-color: var(--primary-color);
    --border-opacity: 1;
    --border: var(--border-width) var(--border-style) hsla(var(--border-color), var(--border-opacity));
    --border-radius: var(--primary-radius);
    --offset_x: 0px;
    --offset-y: 6px;
    --blur: 30px;
    --shadow-color: var(--primary-color);
    --shadow-opacity: 0;
    --box-shadow: var(--offset_x) var(--offset-y) var(--blur) hsla( var(--shadow-color), var(--shadow-opacity) );
    display: inline-grid;
    grid-auto-flow: column;
    gap: 5px;
    justify: content-center;
    align: items-center;
    width: var(--width);
    height: var(--height);
    max-width: 100%;
    font-size: var(--size);
    font-weight: var(--weight);
    color: hsl( var(--color) );
    background-color: hsla( var(--bg-color), var(--opacity) );
    border: var(--border);
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    padding: var(--padding);
    transition: font-size .3s, font-weight .15s, color .3s, background-color .3s, opacity .3s, border .3s, box-shadow .3s ease-in-out;
    cursor: pointer;
    -webkit-mask-image: -webkit-radial-gradient(white, black);
}
:host(i-button:hover) {
    --size: var(--primary-size-hover);
    --weight: var(--primary-weight-hover);
    --color: var(--primary-color-hover);
    --bg-color: var(--primary-bg-color-hover);
    --border-color: var(--primary-color-hover);
    --offset-x: 0;
    --offset-y: 0;
    --blur: 50px;
    --shadow-color: var(--primary-color-hover);
    --shadow-opacity: 0;
}
:host(i-button:hover:focus:active) {
    --bg-color: var(--primary-bg-color);
}
:host(i-button:focus) {
    --color: var(--color-focus);
    --bg-color: var(--bg-color-focus);
    background-color: hsla(var(--bg-color));
}
:host(i-button) g {
    --icon-fill: var(--primary-icon-fill);
    fill: hsl(var(--icon-fill));
    transition: fill 0.05s ease-in-out;
}
:host(i-button:hover) g {
  --icon-fill: var(--primary-icon-fill-hover);
}
:host(i-button[aria-disabled="true"]) .icon, 
:host(i-button[aria-disabled="true"]:hover) .icon,
:host(i-button[aria-current="true"]), :host(i-button[aria-current="true"]:hover) {
    --size: var(--current-size);
    --weight: var(--current-weight);
    --color: var(--current-color);
    --bg-color: var(--current-bg-color);
}
:host(i-button[aria-current="true"]) .icon,  :host(i-button[aria-current="true"]:hover) .icon {
    --icon-size: var(--current-icon-size);
}
:host(i-button[aria-current="true"]) g {
    --icon-fill: var(--current-icon-fill);
}
:host(i-button[aria-current="true"]:focus) {
    --color: var(--color-focus);
    --bg-color: var(--bg-color-focus);
}
:host(i-button[disabled]), :host(i-button[disabled]:hover) {
    --size: var(--primary-disabled-size);
    --color: var(--primary-disabled-color);
    --bg-color: var(--primary-disabled-bg-color);
    cursor: not-allowed;
}
:host(i-button[disabled]) g, 
:host(i-button[disabled]:hover) g, 
/* define grid */
:host(i-button) .text {
}
:host(i-button) .icon {
    --icon-size: var(--primary-icon-size);
    display: block;
    width: var(--icon-size);
    transition: width 0.25s ease-in-out;
}
:host(i-button:hover) .icon {
    --icon-size: var(--primary-icon-size-hover);
}
`)