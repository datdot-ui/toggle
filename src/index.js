const style_sheet = require('support-style-sheet')
const protocol_maker = require('protocol-maker')
const make_img = require('make-image')
const make_element = require('make-element')
const make_grid = require('make-grid')
const i_icon = require('datdot-ui-icon')

var id = 0
var icon_count = 0

module.exports = i_button

function i_button (opts, parent_wire) {
    const {name, role = 'button', body = '', icons = {}, cover, classlist = null, mode = '', state, expanded = undefined, current = undefined, selected = false, checked = false, disabled = false, theme = {}} = opts
    const el = make_element({name: 'i-button', classlist, role })
    const {icon = {}, select = { name: 'check' }, list = { name: 'arrow-down'} } = icons
    var status = 'default_status'
    var STATE = {}

/* ------------------------------------------------
                    <protocol>
------------------------------------------------ */

    const initial_contacts = { 'parent': parent_wire }
    const contacts = protocol_maker('input-number', listen, initial_contacts)

    function listen (msg) {
        const { head, refs, type, data, meta } = msg // receive msg
        const [from, to, msg_id] = head
        console.log('BUTTON', { type, name: contacts.by_address[from].name, msg })
        const cases = {
            'switch': () => handle_switched_event(data), //toggle
            'expanded': () => handle_expanded_event(data), // dropdown
            'collapsed': () => handle_collapsed_event(data),
            'tab-selected': () => handle_tab_selected_event(data), //tab/checkbox
            'selected': () => handle_list_selected_event(data), // option
            'unselected': () => handle_list_selected_event(data), 
            'changed': () => handle_changed_event(data), 
            'current': () => handle_current_event(data), 
        }
       const handler = cases[type] || default_handler
       function default_handler () {
           console.log()
       }
    }
/* ------------------------------------------------
                    </protocol>
------------------------------------------------ */


function make_button () {
    const $parent = contacts.by_name['parent']
    // init_status(role)
    $parent.notify($parent.make({ to: $parent.address, type: 'ready', data: { status } }))
    
    if (icon?.name) var main_icon = i_icon({ name: icon.name, path: icon.path}, contacts.add(`${icon.name}-${icon_count++}`))
    console.log({status, role})
    const shadow = el.attachShadow({mode: 'closed'})
    const text = make_element({name: 'span', classlist: 'text'})
    const avatar = make_element({name: 'span', classlist: 'avatar'})
    const listbox = make_element({name: 'span', classlist: 'listbox'})
    const option = make_element({name: 'span', classlist: 'option'})
    // check icon, img and body if has value
    const add_cover = typeof cover === 'string' ? avatar : undefined
    const add_text = body ? typeof body === 'object' ? 'undefined' : text : undefined
    if (typeof cover === 'string') avatar.append(make_img({src: cover, alt: name}))
    if (status !== 'disabled') el.onclick = handle_click
    el.setAttribute('aria-label', name)
    text.append(body)
    style_sheet(shadow, style)
    const items = [main_icon, add_cover, add_text]
    append_items(items, shadow, option, listbox)
    init_attr(el)
    return el
    }

    /////////

    // const set_status = new_status => {
    //     const state_machine = {
    //         'current_selected': ['current_selected', 'current_unselected', 'notcurrent_selected', 'notcurrent_unselected'],
    //         'current_unselected': ['current_selected', 'current_unselected', 'notcurrent_selected', 'notcurrent_unselected'], // QUESTION: can current_unselected become notcurrent_unselected in one event?
    //         'expanded': ['expanded', 'collapsed'],
    //         'collapsed': ['expanded', 'collapsed'],
    //         'checked': ['checked', 'unchecked'],
    //         'unchecked': ['checked', 'unchecked'],
    //     }
    //     if (!state_machine[status].includes(new_status)) throw new Error('invalid state transition')
    //     status = new_status
    // }

    // function init_status (role) {
    //     if (disabled) status = 'disabled'
    //     else if (role ==='button' || role === 'tab' || role === 'option' || role === 'menuitem') {  
    //         if (selected && current) status = 'current_selected'
    //         else if (!selected && current) status = 'current_unselected'
    //         else if (selected && !current) status = 'notcurrent_selected'
    //         else if (!selected && !current) status = 'notcurrent_unselected'
    //     }
    //     else if (role === 'switch') checked ? status = 'checked' : status = 'unchecked'
    //     else if (role === 'listbox') expanded ? status = 'expanded' : status = 'collapsed'
    // }

    function handle_current_event (current) {
        return set_attr({aria: 'current', prop: current})
    }

    function init_attr (el) {
        // define conditions
        if (state) set_attr({aria: 'aria-live', prop: 'assertive'})
        if (selected) set_attr({aria: 'selected', prop: selected})
        if (checked) set_attr({aria: 'checked', prop: checked})
        if (disabled)  set_attr({aria: 'disabled', prop: disabled})
        if (expanded ) set_attr({aria: 'expanded', prop: expanded})
        if (current) set_attr({aria: 'current', prop: current})
        el.setAttribute('tabindex', current ? 0 : -1)
    }

    // make element to append into shadowDOM
    function append_items(items, shadow, option, listbox) {         
        const [main_icon, add_cover, add_text] = items
        const target = role === 'listbox' ? listbox : role === 'option' ?  option : shadow
        // list of listbox or dropdown menu
        if (role.match(/option/)) shadow.append(i_icon(list,  contacts.add(`${list.name}-${icon_count++}`)), option)
        // listbox or dropdown button
        if (role.match(/listbox/)) shadow.append(i_icon(select, contacts.add(`${select.name}-${icon_count++}`)), listbox)
        items.forEach( item => {
            if (item === undefined) return
            target.append(item)
        })
    }

    function set_attr ({aria, prop}) { el.setAttribute(`aria-${aria}`, prop) }

    // toggle
    function handle_switched_event (data) {
        const {checked} = data
        STATE.checked = checked
        if (STATE.checked) return set_attr({aria: 'checked', prop: STATE.checked})
        else el.removeAttribute('aria-checked')
    }
    function handle_expanded_event (data) {
        STATE.expanded = data
        set_attr({aria: 'expanded', prop: STATE.expanded})
    }
    function handle_collapsed_event (data) {
        STATE.expanded = data
        set_attr({aria: 'expanded', prop: STATE.expanded})
    }
    // tab selected
    function handle_tab_selected_event ({selected}) {
        STATE.selected = selected
        set_attr({aria: 'selected', prop: STATE.selected})
        el.setAttribute('tabindex', STATE.current ? 0 : -1)
    }
    function handle_list_selected_event (data) {
        STATE.selected = data
        set_attr({aria: 'selected', prop: STATE.selected})
        if (mode === 'listbox-single') {
            STATE.current = STATE.selected
            set_attr({aria: 'current', prop: STATE.current})
        }
        // option is selected then send selected items to listbox button
        const $parent = contacts.by_name['parent']
        if (STATE.selected) $parent.notify($parent.make({ to: $parent.address, type: 'changed', data: {text: body, cover, icon } }))
    }
    function handle_changed_event (data) {
        const {text, cover, icon, title} = data
        // new element
        const new_text = make_element({name: 'span', classlist: 'text'})
        const new_avatar = make_element({name: 'span', classlist: 'avatar'})
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
            if (cover) {
                if (old_avatar) {
                    const img = old_avatar.querySelector('img')
                    img.alt = text || title
                    img.src = cover
                } else {
                    new_avatar.append(make_img({src: cover, alt: text || title}))
                    shadow.insertBefore(new_avatar, shadow.firstChild)
                }
            } else {
                if (old_avatar) old_avatar.remove()
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
            if (cover) {
                new_avatar.append(make_img({src: cover, alt: text}))
                if (role.match(/listbox/)) listbox.append(new_avatar)
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
        const prev_state = {
            expanded: STATE.expanded,
            selected: STATE.selected
        }
        // debugger
        if (STATE.current) {
            $parent.notify($parent.make({ to: $parent.address, type: 'current', data: {name, current: STATE.current } }))
        }
        if (expanded !== undefined) {
            STATE.expanded = !prev_state.expanded
            const type = STATE.expanded ? 'expanded' : 'collapsed'
            $parent.notify($parent.make({ to: $parent.address, type, data: {name, expanded: STATE.expanded } }))
        }
        if (role === 'button') {
            return $parent.notify($parent.make({ to: $parent.address, type }))
        }
        if (role === 'tab') {
            if (STATE.current) return
            STATE.selected = !prev_state.selected
            return $parent.notify($parent.make({ to: $parent.address, type, data: {name, selected: STATE.selected } }))
        }
        if (role === 'switch') {
            return $parent.notify($parent.make({ to: $parent.address, type, data: {name, checked: STATE.checked } }))
        }
        if (role === 'listbox') {
            STATE.expanded = !prev_state.expanded
            return $parent.notify($parent.make({ to: $parent.address, type, data: {name, expanded: STATE.expanded } }))
        }
        if (role === 'option' || role === 'menuitem') {
            STATE.selected = !prev_state.selected
            return $parent.notify($parent.make({ to: $parent.address, type, data: {name, selected: STATE.selected, content: STATE.selected ? {text: body, cover, icon} : '' } }))
        }
    }
   
    // insert CSS style
    const custom_style = theme ? theme.style : ''
    // set CSS variables
    const {props = {}, grid = {}} = theme
    const {
        // default -----------------------------------------//
        padding, margin, width, height, opacity, 
        // size
        size, size_hover, 
        // weight
        weight, weight_hover, 
        // color
        color, color_hover, color_focus,
        // background-color
        bg_color, bg_color_hover, bg_color_focus,
        // border
        border_color, border_color_hover,
        border_width, border_style, border_opacity, border_radius, 
        // icon
        icon_fill, icon_fill_hover, icon_size, icon_size_hover,
        // avatar
        avatar_width, avatar_height, avatar_radius,
        avatar_width_hover, avatar_height_hover,
        // shadow
        shadow_color, shadow_color_hover, 
        offset_x, offset_x_hover,
        offset_y, offset_y_hover, 
        blur, blur_hover,
        shadow_opacity, shadow_opacity_hover,
        // scale
        scale, scale_hover,
        // current -----------------------------------------//
        current_size, 
        current_weight, 
        current_color, 
        current_bg_color,
        current_icon_size,
        current_icon_fill,
        current_list_selected_icon_size,
        current_list_selected_icon_fill,
        current_avatar_width, 
        current_avatar_height,
        // disabled -----------------------------------------//
        disabled_size, disabled_weight, disabled_color,
        disabled_bg_color, disabled_icon_fill, disabled_icon_size,
        // role === option ----------------------------------//
        list_selected_icon_size, list_selected_icon_size_hover,
        list_selected_icon_fill, list_selected_icon_fill_hover,
        // role === listbox ----------------------------------//
        // collapsed settings
        listbox_collapsed_bg_color, listbox_collapsed_bg_color_hover,
        listbox_collapsed_icon_size, listbox_collapsed_icon_size_hover,
        listbox_collapsed_icon_fill, listbox_collapsed_icon_fill_hover, 
        listbox_collapsed_listbox_color, listbox_collapsed_listbox_color_hover,
        listbox_collapsed_listbox_size, listbox_collapsed_listbox_size_hover,
        listbox_collapsed_listbox_weight, listbox_collapsed_listbox_weight_hover,
        listbox_collapsed_listbox_icon_size, listbox_collapsed_listbox_icon_size_hover,
        listbox_collapsed_listbox_icon_fill, listbox_collapsed_listbox_icon_fill_hover,
        listbox_collapsed_listbox_avatar_width, listbox_collapsed_listbox_avatar_height,
        // expanded settings
        listbox_expanded_bg_color,
        listbox_expanded_icon_size, 
        listbox_expanded_icon_fill,
        listbox_expanded_listbox_color,
        listbox_expanded_listbox_size, 
        listbox_expanded_listbox_weight,
        listbox_expanded_listbox_avatar_width, 
        listbox_expanded_listbox_avatar_height,
        listbox_expanded_listbox_icon_size, 
        listbox_expanded_listbox_icon_fill, 
    } = props

    const grid_init = {auto: {auto_flow: 'column'}, align: 'items-center', gap: '5px', justify: 'items-center'}
    const grid_option = grid.option ? grid.option : grid_init
    const grid_listbox = grid.listbox ? grid.listbox : grid_init
    const style = `
    :host(i-button) {
        --size: ${size ? size : 'var(--primary-size)'};
        --weight: ${weight ? weight : 'var(--weight300)'};
        --color: ${color ? color : 'var(--primary-color)'};
        --color-focus: ${color_focus ? color_focus : 'var(--primary-color-focus)'};
        --bg-color: ${bg_color ? bg_color : 'var(--primary-bg-color)'};
        --bg-color-focus: ${bg_color_focus ? bg_color_focus : 'var(--primary-bg-color-focus)'};
        ${width && `--width: ${width}`};
        ${height && `--height: ${height}`};
        --opacity: ${opacity ? opacity : '1'};
        --padding: ${padding ? padding : '12px'};
        --margin: ${margin ? margin : '0'};
        --border-width: ${border_width ? border_width : '0px'};
        --border-style: ${border_style ? border_style : 'solid'};
        --border-color: ${border_color ? border_color : 'var(--primary-color)'};
        --border-opacity: ${border_opacity ? border_opacity : '1'};
        --border: var(--border-width) var(--border-style) hsla( var(--border-color), var(--border-opacity) );
        --border-radius: ${border_radius ? border_radius : 'var(--primary-radius)'};
        --offset_x: ${offset_x ? offset_x : '0px'};
        --offset-y: ${offset_y ? offset_y : '6px'};
        --blur: ${blur ? blur : '30px'};
        --shadow-color: ${shadow_color ? shadow_color : 'var(--primary-color)'};
        --shadow-opacity: ${shadow_opacity ? shadow_opacity : '0'};
        --box-shadow: var(--offset_x) var(--offset-y) var(--blur) hsla( var(--shadow-color), var(--shadow-opacity) );
        --avatar-width: ${avatar_width ? avatar_width : 'var(--primary-avatar-width)'};
        --avatar-height: ${avatar_height ? avatar_height : 'var(--primary-avatar-height)'};
        --avatar-radius: ${avatar_radius ? avatar_radius : 'var(--primary-avatar-radius)'};
        display: inline-grid;
        ${grid.button ? make_grid(grid.button) : make_grid({auto: {auto_flow: 'column'}, gap: '5px', justify: 'content-center', align: 'items-center'})}
        ${width && 'width: var(--width);'};
        ${height && 'height: var(--height);'};
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
        --size: ${size_hover ? size_hover : 'var(--primary-size-hover)'};
        --weight: ${weight_hover ? weight_hover : 'var(--primary-weight-hover)'};
        --color: ${color_hover ? color_hover : 'var(--primary-color-hover)'};
        --bg-color: ${bg_color_hover ? bg_color_hover : 'var(--primary-bg-color-hover)'};
        --border-color: ${border_color_hover ? border_color_hover : 'var(--primary-color-hover)'};
        --offset-x: ${offset_x_hover ? offset_x_hover : '0'};
        --offset-y: ${offset_y_hover ? offset_y_hover : '0'};
        --blur: ${blur_hover ? blur_hover : '50px'};
        --shadow-color: ${shadow_color_hover ? shadow_color_hover : 'var(--primary-color-hover)'};
        --shadow-opacity: ${shadow_opacity_hover ? shadow_opacity_hover : '0'};
    }
    :host(i-button:hover:foucs:active) {
        --bg-color: ${bg_color ? bg_color : 'var(--primary-bg-color)'};
    }
    :host(i-button:focus) {
        --color: var(--color-focus);
        --bg-color: var(--bg-color-focus);
        background-color: hsla(var(--bg-color));
    }  
    :host(i-button) g {
        --icon-fill: ${icon_fill ? icon_fill : 'var(--primary-icon-fill)'};
        fill: hsl(var(--icon-fill));
        transition: fill 0.05s ease-in-out;
    }
    :host(i-button:hover) g {
        --icon-fill: ${icon_fill_hover ? icon_fill_hover : 'var(--primary-icon-fill-hover)'};
    }
    :host(i-button) .avatar {
        display: block;
        width: var(--avatar-width);
        height: var(--avatar-height);
        max-width: 100%;
        border-radius: var(--avatar-radius);
        -webkit-mask-image: -webkit-radial-gradient(white, black);
        overflow: hidden;
        transition: width .3s, height .3s ease-in-out;
        ${make_grid(grid.avatar)}
    }
    :host(i-button) img {
        --scale: ${scale ? scale : '1'};
        width: 100%;
        height: 100%;
        transform: scale(var(--scale));
        transition: transform 0.3s, scale 0.3s linear;
        object-fit: cover;
        border-radius: var(--avatar-radius);
    }
    :host(i-button:hover) img {
        --scale: ${scale_hover ? scale_hover : '1.2'};
        transform: scale(var(--scale));
    }
    :host(i-button) svg {
        width: 100%;
        height: auto;
    }
    :host(i-button[aria-expanded="true"]:focus) {
        --color: var(--color-focus);
        --bg-color: var(--bg-color-focus);
    } 
    :host(i-button[role="tab"]) {
        --width: ${width ? width : '100%'};
        --border-radius: ${border_radius ? border_radius : '0'};
    }
    :host(i-button[role="switch"]) {
        --size: ${size ? size : 'var(--primary-size)'};
    }
    :host(i-button[role="switch"]:hover) {
        --size: ${size_hover ? size_hover : 'var(--primary-size-hover)'};
    }
    :host(i-button[role="switch"]:focus) {
        --color: var(--color-focus);
        --bg-color: var(--bg-color-focus);
    }
    :host(i-button[role="listbox"]) {
        --color: ${listbox_collapsed_listbox_color ? listbox_collapsed_listbox_color : 'var(--listbox-collapsed-listbox-color)'};
        --size: ${listbox_collapsed_listbox_size ? listbox_collapsed_listbox_size : 'var(--listbox-collapsed-listbox-size)'};
        --weight: ${listbox_collapsed_listbox_weight ? listbox_collapsed_listbox_weight : 'var(--listbox-collapsed-listbox-weight)'};
        --bg-color: ${listbox_collapsed_bg_color ? listbox_collapsed_bg_color : 'var(--listbox-collapsed-bg-color)'};
    }
    :host(i-button[role="listbox"]:hover) {
        --color: ${listbox_collapsed_listbox_color_hover ? listbox_collapsed_listbox_color_hover : 'var(--listbox-collapsed-listbox-color-hover)'};
        --size: ${listbox_collapsed_listbox_size_hover ? listbox_collapsed_listbox_size_hover : 'var(--listbox-collapsed-listbox-size-hover)'};
        --weight: ${listbox_collapsed_listbox_weight_hover ? listbox_collapsed_listbox_weight_hover : 'var(--listbox-collapsed-listbox-weight-hover)'};
        --bg-color: ${listbox_collapsed_bg_color_hover ? listbox_collapsed_bg_color_hover : 'var(--listbox-collapsed-bg-color-hover)'};
    }
    :host(i-button[role="listbox"]:focus), :host(i-button[role="listbox"][aria-expanded="true"]:focus) {
        --color: var(--color-focus);
        --bg-color: var(--bg-color-focus);
    }
    :host(i-button[role="listbox"]) > .icon {
        ${grid.icon ? make_grid(grid.icon) : make_grid({column: '2'})}
    }
    :host(i-button[role="listbox"]) .text {}
    :host(i-button[role="listbox"]) .avatar {
        --avatar-width: ${listbox_collapsed_listbox_avatar_width ? listbox_collapsed_listbox_avatar_width : 'var(--listbox-collapsed-listbox-avatar-width)'};
        --avatar-height: ${listbox_collapsed_listbox_avatar_height ? listbox_collapsed_listbox_avatar_height : 'var(--listbox-collapsed-listbox-avatar-height)'}
    }
    :host(i-button[role="listbox"][aria-expanded="true"]),
    :host(i-button[role="listbox"][aria-expanded="true"]:hover) {
        --size: ${listbox_expanded_listbox_size ? listbox_expanded_listbox_size : 'var(--listbox-expanded-listbox-size)'};
        --color: ${listbox_expanded_listbox_color ? listbox_expanded_listbox_color : 'var(--listbox-expanded-listbox-color)'};
        --weight: ${listbox_expanded_listbox_weight ? listbox_expanded_listbox_weight : 'var(--listbox-expanded-listbox-weight)'};
        --bg-color: ${listbox_expanded_bg_color ? listbox_expanded_bg_color : 'var(--listbox-expanded-bg-color)'}
    }
    :host(i-button[role="listbox"][aria-expanded="true"]) .avatar {
        --avatar-width: ${listbox_expanded_listbox_avatar_width ? listbox_expanded_listbox_avatar_width : 'var(--listbox-expanded-listbox-avatar-width)'};
        --avatar-height: ${listbox_expanded_listbox_avatar_height ? listbox_expanded_listbox_avatar_height : 'var(--listbox-expanded-listbox-avatar-height)'};
    }
    :host(i-button[role="option"]) {
        --border-radius: ${border_radius ? border_radius : '0'};
        --opacity: ${opacity ? opacity : '0'};
    }
    :host(i-button[role="option"][aria-current="true"]), :host(i-button[role="option"][aria-current="true"]:hover) {
        --size: ${current_size ? current_size : 'var(--current-list-size)'};
        --color: ${current_color ? current_color : 'var(--current-list-color)'};
        --bg-color: ${current_bg_color ? current_bg_color : 'var(--current-list-bg-color)'};
        --opacity: ${opacity ? opacity : '0'}
    }
    :host(i-button[role="option"][aria-current="true"]:focus) {
        --color: var(--color-focus);
        --bg-color: var(--bg-color-focus);
    }
    :host(i-button[role="option"][disabled]), :host(i-button[role="option"][disabled]:hover) {
        --size: ${disabled_size ? disabled_size : 'var(--primary-disabled-size)'};
        --color: ${disabled_color ? disabled_color : 'var(--primary-disabled-color)'};
        --bg-color: ${disabled_bg_color ? disabled_bg_color : 'var(--primary-disabled-bg-color)'};
        --opacity: ${opacity ? opacity : '0'}
    }
    :host(i-button[aria-disabled="true"]) .icon, 
    :host(i-button[aria-disabled="true"]:hover) .icon,
    :host(i-button[role="option"][aria-disabled="true"]) .icon, 
    :host(i-button[role="option"][aria-disabled="true"]:hover) .icon,
    :host(i-button[role="listbox"][aria-disabled="true"]) .icon, 
    :host(i-button[role="listbox"][aria-disabled="true"]:hover) .icon {
        --icon-size: ${disabled_icon_size ? disabled_icon_size : 'var(--primary-disabled-icon-size)'};
    }
    :host(i-button[disabled]:hover) img {
        transform: scale(1);
    }
    :host(i-button[aria-current="true"]), :host(i-button[aria-current="true"]:hover) {
        --size: ${current_size ? current_size : 'var(--current-size)'};
        --weight: ${current_weight ? current_weight : 'var(--current-weight)'};
        --color: ${current_color ? current_color : 'var(--current-color)'};
        --bg-color: ${current_bg_color ? current_bg_color : 'var(--current-bg-color)'};
    }
    :host(i-button[aria-current="true"]) .icon,  :host(i-button[aria-current="true"]:hover) .icon {
        --icon-size: ${current_icon_size ? current_icon_size : 'var(--current-icon-size)'};
    }
    :host(i-button[aria-current="true"]) g {
        --icon-fill: ${current_icon_fill ? current_icon_fill : 'var(--current-icon-fill)'};
    }
    :host(i-button[aria-current="true"]:focus) {
        --color: var(--color-focus);
        --bg-color: var(--bg-color-focus);
    }
    :host(i-button[role="option"][aria-current="true"][aria-selected="true"]) .option > .icon, 
    :host(i-button[role="option"][aria-current="true"][aria-selected="true"]:hover) .option > .icon {
        --icon-size: ${current_icon_size ? current_icon_size : 'var(--current-icon-size)'};
    }
    :host(i-button[aria-checked="true"]), :host(i-button[aria-expanded="true"]),
    :host(i-button[aria-checked="true"]:hover), :host(i-button[aria-expanded="true"]:hover) {
        --size: ${current_size ? current_size : 'var(--current-size)'};
        --weight: ${current_weight ? current_weight : 'var(--current-weight)'};
        --color: ${current_color ? current_color : 'var(--current-color)'};
        --bg-color: ${current_bg_color ? current_bg_color : 'var(--current-bg-color)'};
    }
    /*
    :host(i-button[role="switch"][aria-expanded="true"]) g {
        --icon-fill: var(--current-icon-fill);
    }*/
    /* listbox collapsed */
    :host(i-button[role="listbox"]) > .icon {
        --icon-size: ${listbox_collapsed_icon_size ? listbox_collapsed_icon_size : 'var(--listbox-collapsed-icon-size)'};
    }
    :host(i-button[role="listbox"]:hover) > .icon {
        --icon-size: ${listbox_collapsed_icon_size_hover ? listbox_collapsed_icon_size_hover : 'var(--listbox-collapsed-icon-size-hover)'};
    }
    :host(i-button[role="listbox"]) .listbox > .icon {
        --icon-size: ${listbox_collapsed_listbox_icon_size ? listbox_collapsed_listbox_icon_size : 'var(--listbox-collapsed-listbox-icon-size)'};
    }
    :host(i-button[role="listbox"]:hover) .listbox > .icon {
        --icon-size: ${listbox_collapsed_listbox_icon_size_hover ? listbox_collapsed_listbox_icon_size_hover : 'var(--listbox-collapsed-listbox-icon-size-hover)'};
    }
    :host(i-button[role="listbox"]) > .icon g {
        --icon-fill: ${listbox_collapsed_icon_fill ? listbox_collapsed_icon_fill : 'var(--listbox-collapsed-icon-fill)'};
    }
    :host(i-button[role="listbox"]:hover) > .icon g {
        --icon-fill: ${listbox_collapsed_icon_fill_hover ? listbox_collapsed_icon_fill_hover : 'var(--listbox-collapsed-icon-fill-hover)'};
    }
    :host(i-button[role="listbox"]) .listbox > .icon g {
        --icon-fill: ${listbox_collapsed_listbox_icon_fill ? listbox_collapsed_listbox_icon_fill : 'var(--listbox-collaps-listbox-icon-fill)'};
    }
    :host(i-button[role="listbox"]:hover) .listbox > .icon g {
        --icon-fill: ${listbox_collapsed_listbox_icon_fill_hover ? listbox_collapsed_listbox_icon_fill_hover : 'var(--listbox-collapsed-listbox-icon-fill-hover)'};
    }
    /* listbox expanded */
    :host(i-button[role="listbox"][aria-expanded="true"]) > .icon,
    :host(i-button[role="listbox"][aria-expanded="true"]:hover) > .icon {
        --icon-size: ${listbox_expanded_icon_size ? listbox_expanded_icon_size : 'var(--listbox-expanded-icon-size)'};
    }
    :host(i-button[role="listbox"][aria-expanded="true"]) > .icon g, 
    :host(i-button[role="listbox"][aria-expanded="true"]:hover) > .icon g {
        --icon-fill: ${listbox_expanded_icon_fill ? listbox_expanded_icon_fill : 'var(--listbox-expanded-icon-fill)'}
    }
    :host(i-button[role="listbox"][aria-expanded="true"]) .listbox > .icon, 
    :host(i-button[role="listbox"][aria-expanded="true"]:hover) .listbox > .icon {
        --icon-fill: ${listbox_expanded_listbox_icon_size ? listbox_expanded_listbox_icon_size : 'var(--listbox-expanded-listbox-icon-size)'};
    }
    :host(i-button[role="listbox"][aria-expanded="true"]) .listbox > .icon g,
    :host(i-button[role="listbox"][aria-expanded="true"]:hover) .listbox > .icon g {
        --icon-fill: ${listbox_expanded_listbox_icon_fill ? listbox_expanded_listbox_icon_fill : 'var(--listbox-expanded-listbox-icon-fill)'};
    }
    :host(i-button[aria-checked="true"]) > .icon g {
        --icon-fill: ${current_icon_fill ? current_icon_fill : 'var(--color-white)' };
    }
    :host(i-button[disabled]), :host(i-button[disabled]:hover) {
        --size: ${disabled_size ? disabled_size : 'var(--primary-disabled-size)'};
        --color: ${disabled_color ? disabled_color : 'var(--primary-disabled-color)'};
        --bg-color: ${disabled_bg_color ? disabled_bg_color : 'var(--primary-disabled-bg-color)'};
        cursor: not-allowed;
    }
    :host(i-button[disabled]) g, 
    :host(i-button[disabled]:hover) g, 
    :host(i-button[role="option"][disabled]) > .icon g, 
    :host(i-button[role="option"][disabled]) .option > .icon g,
    :host(i-button[role="listbox"][disabled]) .option > .icon g, 
    :host(i-button[role="option"][disabled]:hover) > .icon g,
    :host(i-button[role="listbox"][disabled]:hover) .option > .icon g, 
    :host(i-button[role="option"][disabled]:hover) .option > .icon g {
        --icon-fill: ${disabled_color ? disabled_color : 'var(--primary-disabled-icon-fill)'};
    }
    :host(i-button[role="menuitem"]) {
        --size: ${size ? size : 'var(--menu-size)'};
        --weight: ${weight ? weight : 'var(--menu-weight)'};
        --color: ${color ? color : 'var(--menu-color)'};
        --border-radius: 0;
        background-color: transparent;
    }
    :host(i-button[role="menuitem"]:hover) {
        --size: ${size_hover ? size_hover : 'var(--menu-size-hover)'};
        --weight: ${weight_hover ? weight_hover : 'var(--menu-weight-hover)'};
        --color: ${color_hover ? color_hover : 'var(--menu-color-hover)'};
    }
    // :host(i-button[role="menuitem"][aria-selected="true"]:focus) {
    //     --color: var(--color-focus);
    //     --bg-color: var(--bg-color-focus);
    // }
    :host(i-button[role="menuitem"][aria-selected="true"]) {
        --color: var(--color-focus);
        --bg-color: var(--bg-color-focus);
    }
    :host(i-button[role="menuitem"]) .avatar {
        --avatar-width: ${avatar_width ? avatar_width : 'var(--menu-avatar-width)'};
        --avatar-height: ${avatar_height ? avatar_height : 'var(--menu-avatar-height)'};
        --avatar-radius: ${avatar_radius ? avatar_radius : 'var(--menu-avatar-radius)'};
    }
    :host(i-button[role="menuitem"]:hover) .avatar {
        --avatar-width: ${avatar_width_hover ? avatar_width_hover : 'var(--menu-avatar-width-hover)'};
        --avatar-height: ${avatar_height_hover ? avatar_height_hover : 'var(--menu-avatar-height-hover)'};
    }
    :host(i-button[role="menuitem"][disabled]), :host(i-button[role="menuitem"][disabled]):hover {
        --size: ${disabled_size ? disabled_size : 'var(--menu-disabled-size)'};
        --color: ${disabled_color ? disabled_color : 'var(--menu-disabled-color)'};
        --weight: ${disabled_weight ? disabled_weight : 'var(--menu-disabled-weight)'};
    }
    :host(i-button[role="menuitem"][disabled]) g ,
    :host(i-button[role="menuitem"][disabled]:hover) g {
        --icon-fill: ${disabled_icon_fill ? disabled_icon_fill : 'var(--primary-disabled-icon-fill)'};
    }
    :host(i-button[role="option"]) > .icon {
        --icon-size: ${list_selected_icon_size ? list_selected_icon_size : 'var(--list-selected-icon-size)'};
    }
    :host(i-button[role="option"]:hover) > .icon {
        --icon-size: ${list_selected_icon_size_hover ? list_selected_icon_size_hover : 'var(--list-selected-icon-size-hover)'};
    }
    :host(i-button[role="option"]) > .icon g {
        --icon-fill: ${list_selected_icon_fill ? list_selected_icon_fill : 'var(--list-selected-icon-fill)'};
    }
    :host(i-button[role="option"]:hover) > .icon g {
        --icon-fill: ${list_selected_icon_fill_hover ? list_selected_icon_fill_hover : 'var(--list-selected-icon-fill-hover)'};
    }
    :host(i-button[role="option"][aria-current="true"]) > .icon, 
    :host(i-button[role="option"][aria-current="true"]:hover) > .icon {
        --icon-size: ${current_list_selected_icon_size ? current_list_selected_icon_size : 'var(--current-list-selected-icon-size)'};
    }
    :host(i-button[role="option"][aria-current="true"]) > .icon g, 
    :host(i-button[role="option"][aria-current="true"]:hover) > .icon g { 
        --icon-fill: ${current_list_selected_icon_fill ? current_list_selected_icon_fill : 'var(--current-list-selected-icon-fill)'};
    }
    :host(i-button[role="option"][aria-selected="false"]) > .icon {
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
    }
    :host(i-button[role="option"][aria-selected="true"]) > .icon {
        opacity: 1;
    }
    /* define grid */
    :host(i-button) .text {
        ${make_grid(grid.text)}
    }
    :host(i-button) .icon {
        --icon-size: ${icon_size ? icon_size : 'var(--primary-icon-size)'};
        display: block;
        width: var(--icon-size);
        transition: width 0.25s ease-in-out;
        ${make_grid(grid.icon)}
    }
    :host(i-button:hover) .icon {
        --icon-size: ${icon_size_hover ? icon_size_hover : 'var(--primary-icon-size-hover)'};
    }
    :host(i-button) .listbox {
        display: grid;
        max-width: 100%;
        ${make_grid(grid_listbox)}
    }
    :host(i-button) .option {
        display: grid;
        max-width: 100%;
        ${make_grid(grid_option)}
    }
    :host(i-button) .option > .icon {
        ${make_grid(grid.option_icon)}
    }
    :host(i-button) .option > .avatar {
        ${make_grid(grid.option_avatar)}
    }
    :host(i-button) .option > .text {
        ${make_grid(grid.option_text)}
    }
    ${custom_style}
    `

    return make_button()
}