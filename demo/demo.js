const bel = require('bel')
const csjs = require('csjs-inject')
const i_button = require('..')
const protocol_maker = require('protocol-maker')
const make_grid = require('../src/node_modules/make-grid')

var id = 0

function demo () {
//------------------------------------------
    const contacts = protocol_maker('demo', listen)

    function listen (msg) {
        console.log('New message', { msg })
        const { head, refs, type, data, meta } = msg // receive msg
        const [from] = head
        // send back ack
        const $from = contacts.by_address[from]
        $from.notify($from.make({ to: $from.address, type: 'ack', refs: { 'cause': head } }))
        // handle
        if (type === 'click') return handle_click_event(msg)
    }
//------------------------------------------
    // buttons
    const primary = i_button(
    {
        name: 'primary', 
        title: 'Hello',
        theme: ``
    }, contacts.add('primary'))

    const current1 = i_button({
        name: 'button1',
        title: 'Button1',
        state: {
            expanded: false,
        }
        // current: true,
    }, contacts.add('button1'))

    const current2 = i_button({
        name: 'button2',
        title: 'Button2',
    }, contacts.add('button2'))

    // image buttons
    const thumb1_btn = i_button(
    {
        name: 'thumb-cover', 
        title: 'Cover',
        // cover: 'https://cdn.pixabay.com/photo/2021/08/14/04/15/mountains-6544522_960_720.jpg',
        theme: ``
    }, contacts.add('thumb-cover'))
    
    const thumb2_btn = i_button(
    {
        name: 'thumb-blossom', 
        title: 'Blossom', 
        // cover: 'https://cdn.pixabay.com/photo/2016/02/27/06/43/cherry-blossom-tree-1225186_960_720.jpg',
        // checked: false, 
        theme: ``
    }, contacts.add('thumb-blossom'))

    const rabbit_btn = i_button(
    {
        name: 'rabbit', 
        title: 'Rabbit', 
        icons: [ { name: 'rabbit' } ],
        // cover: 'https://images.unsplash.com/photo-1629122307243-c913571a1df6?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5MXx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        theme: ``
    }, contacts.add('rabbit'))
    const dog_btn = i_button(
    {
        name: 'dog', 
        title: 'Dog',
        // cover: 'https://images.unsplash.com/photo-1520087619250-584c0cbd35e8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDR8fGRvZ3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        theme: ``
    }, contacts.add('dog'))
    const fox_btn = i_button(
    {
        name: 'fox', 
        title: 'Fox',
        // cover: 'assets/images/photo-1557008075-7f2c5efa4cfd.jpeg',
        state: {
            disabled: true
        },
        theme: ``
    }, contacts.add('fox'))

    const disabled = i_button(
    {
        name: 'disable', 
        title: 'Disable', 
        state: {
            disabled: true,
        },
        theme: ``
    }, contacts.add('disable'))

    const toggle = i_button(
    {
        name: 'toggle', 
        title: 'Toggle',
        icons: [
            {name: 'edit'}
        ],
        // cover: 'https://cdn.pixabay.com/photo/2016/02/27/06/43/cherry-blossom-tree-1225186_960_720.jpg',
        theme: ``
    }, contacts.add('toggle'))

    // Tab element
    const tab1 = i_button(
    {
        name: 'tab1', 
        title: 'Tab1',
        state: {
            current: true, 
        },
        theme: ``
    }, contacts.add('tab1'))
    const tab2 = i_button(
    {
        name: 'tab2', 
        title: 'Tab2', 
        theme: ``
    }, contacts.add('tab2'))
    const tab3 = i_button(
    {
        name: 'tab3', 
        title: 'Tab3',
        theme: ``
    }, contacts.add('tab3'))
    const demo_tab = bel` <nav class=${css.tabs} role="tablist" aria-label="tabs"> ${tab1}${tab2}${tab3} </nav>`

    // Tab & icon
    const tab4 = i_button(
    {
        name: 'notice', 
        title: 'Notice',
        icons: [
            {name: 'notice'}
        ],
        state: {
            current: true, 
        },
        theme: ``
    }, contacts.add('notice'))
    const tab5 = i_button(
    {
        page: 'JOBS', 
        name: 'warning', 
        title: 'Warning', 
        icons: [   
            {name: 'warning'},
        ],
        // cover: 'https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455_960_720.jpg',
        theme: ``
    }, contacts.add('warning'))
    const tab6 = i_button(
    {
        page: 'JOBS', 
        name: 'search',
        title: 'Search', 
        icons: [
            {name: 'search'},
        ], 
        state: {
            disabled: true,
        },
        theme: ``
    }, contacts.add('search'))
    const demo_icon_tab = bel` <nav class=${css.tabs} role="tablist" aria-label="tabs"> ${tab4}${tab5}${tab6} </nav>`

    // icons
    let icon_next = {name: 'arrow-right'}
    // buttons
    const cancel = i_button(
    {
        name: 'cancel', 
        icons: [
            {name: 'cross'}
        ],
        theme: `
            :host(i-button) g {
                --icon-fill: var(--color-red);            
            }
            :host(i-button:hover) {
                --bg-color: var(--color-flame);
            }
        `
    }, contacts.add('cancel'))

    const confirm = i_button(
    {
        name: 'confirm', 
        icons: [
            {name: 'check'}
        ], 
        theme: ``
    }, contacts.add('confirm'))
    const previous = i_button(
    {
        name: 'previous', 
        title: 'Previous', 
        icons: [
            {name: 'arrow-left'}
        ],
        theme: ``
    }, contacts.add('previous'))
    const next = i_button(
    {
        name: 'next',
        // cover: 'https://images.unsplash.com/photo-1529448005898-b19fc13465b7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fG5leHR8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        icons: [
            {name: 'arrow-right'}
        ],
        title: 'Next',
        // title: bel`<div class="col2">${icon({name: 'arrow-right'})} Next</div>`, 
        theme: ``
    }, contacts.add('next'))

    const listbox = i_button(
    {
        name: 'filter', 
        title: 'Filter',
        icons: [
            { name: 'filter' }
        ],
        expanded: false,
        current: true,
        theme: ``
    }, contacts.add('filter'))

    const listbox1 = i_button(
        {
            name: 'single-selector', 
            title: 'Single select',
            icons: [
                {name: 'star'},
                {name: 'arrow-down'},
            ],
            // cover: 'https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455_960_720.jpg',
            state: {
                expanded: false,
            },
            theme: ``
        }, contacts.add('single-selector'))

    const option = i_button(
    {
        name: 'option-star', 
        // title: 'Star', 
        icons: [
            { name: 'star' }, { name: 'check' }
        ],
        // cover: 'https://cdn.pixabay.com/photo/2021/08/31/11/58/woman-6588614_960_720.jpg',
        // classlist: 'icon-col-2',
        state: {
            selected: true,
        },
        theme: ``
    }, contacts.add('option-star'))
    const option1 = i_button(
    {
        name: 'datdot app', 
        title: 'DatDot app', 
        icons: [
            { name: 'datdot-white' }, { name: 'check' }
        ],
        // cover: 'https://cdn.pixabay.com/photo/2021/08/31/11/58/woman-6588614_960_720.jpg',
        // cover: 'https://cdn.pixabay.com/photo/2012/03/01/00/55/garden-19830_960_720.jpg',
        // cover: 'data:image/png;base64,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',
        // cover is only use string
        // cover: icon({name: 'star'}),
        state: {
            selected: true,
        },
        // current: true,
        // disabled: true,
        theme: ``
    }, contacts.add('datdot app'))

    const item4 = i_button(
    {
        name: 'item4',
        title: 'Menu item',
        // cover: 'https://cdn.pixabay.com/photo/2012/03/01/00/55/garden-19830_960_720.jpg',
        theme: ``
    }, contacts.add('item4'))
    // content
    const content = bel`
    <div class=${css.content}>
        <a name="top"></a>
        <section>
            <h2>Text</h2>
            <div class=${css.text}>
                ${primary}${disabled}${toggle}${current1}${current2}
            </div>
        </section>
        <section>
            <h2>Icon</h2>
            <div class=${css.icon}>
                ${cancel}${confirm}${previous}${next}${listbox}
            </div>
        </section>
        <section>
            <h2>Selector</h2>
            <div class=${css.icon}>
                ${listbox1}${option}
            </div>
            <div class=${css.icon}>
                ${option1}
            </div>
        </section>
        <section>
            <h2>Image</h2>
            <div class=${css.icon}>
                ${rabbit_btn}${dog_btn}${fox_btn}
            </div>
            <h2>Thumb</h2>
            <div class=${css.thumb}>
                ${thumb1_btn}${thumb2_btn}
            </div>
        </section>
        <section>
            <h2>Tab</h2>
            ${demo_tab}
            <div class="panels">
                <div id="panel1" class="panel1" role="tabpanel" tabindex="0" aria-labelledby="tab1">
                    <img src="https://cdn.pixabay.com/photo/2017/10/18/16/08/wolves-2864647_960_720.jpg" alt="wolf">
                </div>
                <div id="panel2" class="panel1" role="tabpanel" tabindex="0" aria-labelledby="tab2" hidden="true">
                    <img src="https://cdn.pixabay.com/photo/2018/07/13/10/20/kittens-3535404_960_720.jpg" alt="kittens">
                </div>
                <div id="panel3" class="panel1" role="tabpanel" tabindex="0" aria-labelledby="tab3" hidden="true">
                    <img src="https://cdn.pixabay.com/photo/2016/07/23/23/02/lavenders-1537694_960_720.jpg" alt="bees">
                </div>
            </div>
        </section>
        <section>
            <h2>Tab & icon</h2>
            ${demo_icon_tab}
            <div class="article-panels">
                <div id="panel4" class="panel2" role="tabpanel" tabindex="0" aria-labelledby="tab4">
                    <h1>What is Lorem Ipsum?</h1>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                </div>
                <div id="panel5" class="panel2" role="tabpanel" tabindex="0" aria-labelledby="tab5" hidden="true">
                    <h1>Why do we use it?</h1>
                    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
                </div>
                <div id="panel6" class="panel2" role="tabpanel" tabindex="0" aria-labelledby="tab6" hidden="true">
                    <h1>Where does it come from?</h1>
                    <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
                </div>
            </div>
        </section>     
    </div>`
    const container = bel`<div class="${css.container}">${content}</div>`
    const app = bel`<div class="${css.wrap}">${container}</div>`

    return app

    // handle events
    function handle_click_event ({head, type, refs, data}) {

    }

}

const css = csjs`
:root {
    /* define colors ---------------------------------------------*/
    --b: 0, 0%;
    --r: 100%, 50%;
    --color-white: var(--b), 100%;
    --color-black: var(--b), 0%;
    --color-dark: 223, 13%, 20%;
    --color-deep-black: 222, 18%, 11%;
    --color-red: 358, 99%, 53%;
    --color-amaranth-pink: 329, 100%, 65%;
    --color-persian-rose: 323, 100%, 50%;
    --color-orange: 32, var(--r);
    --color-light-orange: 36, 100%, 55%;
    --color-safety-orange: 27, 100%, 50%;
    --color-deep-saffron: 31, 100%, 56%;
    --color-ultra-red: 348, 96%, 71%;
    --color-flame: 15, 80%, 50%;
    --color-verdigris: 180, 54%, 43%;
    --color-viridian-green: 180, 100%, 63%;
    --color-blue: 214, 100%, 49%;
    --color-heavy-blue: 233, var(--r);
    --color-maya-blue: 205, 96%, 72%;
    --color-slate-blue: 248, 56%, 59%;
    --color-blue-jeans: 204, 96%, 61%;
    --color-dodger-blue: 213, 90%, 59%;
    --color-light-green: 97, 86%, 77%;
    --color-lime-green: 127, 100%, 40%;
    --color-slimy-green: 108, 100%, 28%;
    --color-maximum-blue-green: 180, 54%, 51%;
    --color-deep-green: 136, 79%, 22%;
    --color-green: 136, 82%, 38%;
    --color-lincoln-green: 97, 100%, 18%;
    --color-yellow: 44, 100%, 55%;
    --color-chrome-yellow: 39, var(--r);
    --color-bright-yellow-crayola: 35, 100%, 58%;
    --color-green-yellow-crayola: 51, 100%, 83%;
    --color-purple: 283, var(--r);
    --color-heliotrope: 288, 100%, 73%;
    --color-medium-purple: 269, 100%, 70%;
    --color-electric-violet: 276, 98%, 48%;
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
    /* define font ---------------------------------------------*/
    --snippet-font: Segoe UI Mono, Monospace, Cascadia Mono, Courier New, ui-monospace, Liberation Mono, Menlo, Monaco, Consolas;
    --size12: 1.2rem;
    --size13: 1.3rem;
    --size14: 1.4rem;
    --size15: 1.5rem;
    --size16: 1.6rem;
    --size18: 1.8rem;
    --size20: 2rem;
    --size22: 2.2rem;
    --size24: 2.4rem;
    --size26: 2.6rem;
    --size28: 2.8rem;
    --size30: 3rem;
    --size32: 3.2rem;
    --size34: 3.4rem;
    --size36: 3.6rem;
    --size38: 3.8rem;
    --size40: 4rem;
    --size42: 4.2rem;
    --size44: 4.4rem;
    --size46: 4.6rem;
    --size48: 4.8rem;
    --size50: 5rem;
    --size52: 5.2rem;
    --size54: 5.4rem;
    --size56: 5.6rem;
    --size58: 5.8rem;
    --size60: 6rem;
    --weight100: 100;
    --weight300: 300;
    --weight400: 400;
    --weight600: 600;
    --weight800: 800;
    /* define primary ---------------------------------------------*/
    --primary-body-bg-color: var(--color-greyF2);
    --primary-font: Arial, sens-serif;
    --primary-size: var(--size14);
    --primary-size-hover: var(--primary-size);
    --primary-weight: 300;
    --primary-weight-hover: 300;
    --primary-color: var(--color-black);
    --primary-color-hover: var(--color-white);
    --primary-color-focus: var(--color-orange);
    --primary-bg-color: var(--color-white);
    --primary-bg-color-hover: var(--color-black);
    --primary-bg-color-focus: var(--color-greyA2), 0.5;
    --primary-border-width: 1px;
    --primary-border-style: solid;
    --primary-border-color: var(--color-black);
    --primary-border-opacity: 1;
    --primary-radius: 8px;
    --primary-avatar-width: 100%;
    --primary-avatar-height: auto;
    --primary-avatar-radius: 0;
    --primary-disabled-size: var(--primary-size);
    --primary-disabled-color: var(--color-greyA2);
    --primary-disabled-bg-color: var(--color-greyEB);
    --primary-disabled-icon-size: var(--primary-icon-size);
    --primary-disabled-icon-fill: var(--color-greyA2);
    --primary-listbox-option-icon-size: 20px;
    --primary-listbox-option-avatar-width: 40px;
    --primary-listbox-option-avatar-height: auto;
    --primary-listbox-option-avatar-radius: var(--primary-avatar-radius);
    --primary-option-avatar-width: 30px;
    --primary-option-avatar-height: auto;
    --primary-list-avatar-width: 30px;
    --primary-list-avatar-height: auto;
    --primary-list-avatar-radius: var(--primary-avatar-radius);
    /* define icon settings ---------------------------------------------*/
    --primary-icon-size: var(--size16);
    --primary-icon-size-hover: var(--size16);
    --primary-icon-fill: var(--primary-color);
    --primary-icon-fill-hover: var(--primary-color-hover);
    /* define current ---------------------------------------------*/
    --current-size: var(--primary-size);
    --current-weight: var(--primary-weight);
    --current-color: var(--color-white);
    --current-bg-color: var(--color-black);
    --current-icon-size: var(--primary-icon-size);
    --current-icon-fill: var(--color-white);
    --current-list-selected-icon-size: var(--list-selected-icon-size);
    --current-list-selected-icon-fill: var(--color-white);
    --current-list-selected-icon-fill-hover: var(--color-white);
    --current-list-size: var(--current-size);
    --current-list-color: var(--current-color);
    --current-list-bg-color: var(--current-bg-color);
    --current-list-avatar-width: var(--primary-list-avatar-width);
    --current-list-avatar-height: var(--primary-list-avatar-height);
    /* role listbox settings ---------------------------------------------*/
    /*-- collapsed --*/
    --listbox-collapsed-bg-color: var(--primary-bg-color);
    --listbox-collapsed-bg-color-hover: var(--primary-bg-color-hover);
    --listbox-collapsed-icon-size: var(--size14);
    --listbox-collapsed-icon-size-hover: var(--size14);
    --listbox-collapsed-icon-fill: var(--primary-icon-fill);
    --listbox-collapsed-icon-fill-hover: var(--primary-icon-fill-hover);
    --listbox-collapsed-listbox-size: var(--primary-size);
    --listbox-collapsed-listbox-size-hover: var(--primary-size-hover);
    --listbox-collapsed-listbox-weight: var(--primary-weight);
    --listbox-collapsed-listbox-weight-hover: var(--primary-weight);
    --listbox-collapsed-listbox-color: var(--primary-color);
    --listbox-collapsed-listbox-color-hover: var(--primary-color-hover);
    --listbox-collapsed-listbox-avatar-width: var(--primary-listbox-option-avatar-width);
    --listbox-collapsed-listbox-avatar-height: var(--primary-listbox-option-avatar-height);
    --listbox-collapsed-listbox-icon-size: var(--primary-listbox-option-icon-size);
    --listbox-collapsed-listbox-icon-size-hover: var(--primary-listbox-option-icon-size);
    --listbox-collapsed-listbox-icon-fill: var(--color-blue);
    --listbox-collapsed-listbox-icon-fill-hover: var(--color-yellow);
    /*-- expanded ---*/
    --listbox-expanded-bg-color: var(--current-bg-color);
    --listbox-expanded-icon-size: var(--size14);
    --listbox-expanded-icon-fill: var(--color-light-green);
    --listbox-expanded-listbox-size: var(--size20);
    --listbox-expanded-listbox-weight: var(--primary-weight);
    --listbox-expanded-listbox-color: var(--current-color);
    --listbox-expanded-listbox-avatar-width: var(--primary-listbox-option-avatar-width);
    --listbox-expanded-listbox-avatar-height: var(--primary-listbox-option-avatar-height);
    --listbox-expanded-listbox-icon-size: var(--primary-listbox-option-icon-size);
    --listbox-expanded-listbox-icon-fill: var(--color-light-green);
    /* role option settings ---------------------------------------------*/
    --list-bg-color: var(--primary-bg-color);
    --list-bg-color-hover: var(--primary-bg-color-hover);
    --list-selected-icon-size: var(--size16);
    --list-selected-icon-size-hover: var(--list-selected-icon-size);
    --list-selected-icon-fill: var(--primary-icon-fill);
    --list-selected-icon-fill-hover: var(--primary-icon-fill-hover);
    --menu-size: var(--size15);
    --menu-size-hover: var(--menu-size);
    --menu-weight: var(--primary-weight);
    --menu-weigh-hover: var(--primary-weight);
    --menu-color: var(--primary-color);
    --menu-color-hover: var(--color-grey88);
    --menu-icon-size: 20px;
    --menu-icon-size-hover: var(--menu-icon-size);
    --menu-icon-fill: var(--primary-color);
    --menu-icon-fill-hover: var(--color-grey88);
    --menu-avatar-width: 50px;
    --menu-avatar-width-hover: var(--menu-avatar-width);
    --menu-avatar-height: auto;
    --menu-avatar-height-hover: var(--menu-avatar-height);
    --menu-avatar-radius: 0;
    --menu-disabled-color: var(--primary-disabled-color);
    --menu-disabled-size: var(--menu-size);
    --menu-disabled-weight: var(--primary-weight);
}
html {
    font-size: 62.5%;
    height: 100%;
}
*, *:before, *:after {
    box-sizing: border-box;
    position: relative;
}
body {
    -webkit-text-size-adjust: 100%;
    margin: 0;
    padding: 0;
    font-size: calc(var(--primary-size) + 2px);
    font-family: var(--primary-font);
    color: var(--primary-color);
    background-color: hsl( var(--primary-body-bg-color) );
    height: 100%;
    overflow: hidden;
}
img {
    width: 100%;
    height: auto;
}
.wrap {
    display: grid;
    height: 100%;
}
.container {
    grid-area: container;
    overflow: hidden scroll;
    height: 100%;
}
.content {
    padding: 2% 5%;
}
.text, .icon {
    display: flex;
    flex-wrap: wrap;
    gap: 12px 8px;
    margin-bottom: 20px;
}
.tabs {
    display: grid;
    grid-auto-flow: column;
}
.tabs span {
    width: 40px;
}
#frame {
    width: 100%;
    height: 480px;
}
.thumb i-button:first-child {
   margin-bottom: 20px;
}
`

document.body.append(demo())