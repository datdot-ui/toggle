# datdot-ui-button
DatDot UI component

Opts
---

`{name, role = 'button', controls, body = '', icons = {}, cover, classlist = null, mode = '', state, expanded = undefined, current = undefined, selected = false, checked = false, disabled = false, theme = {}}`

Roles
---

- `button` // disabled = true/false (all other roles acan also be disabled)
- `switch` // i.e. toggle button, checked = true/false
- `tab` // selected = true/false, current = true/false
- `listbox` // i.e. dropdown open/close, expanded = true/false
- `option` // i.e. dropdown option, selected = true/false, current = true/false 
- `menuitem` => see link repo (before button and link were one component) https://github.com/datdot-ui/link @todo remove all link logic from button

Incomming message types
---

- `switched`

**dropdown**
- `expanded/collapsed`

**tab/checkbox**
- `selected/unselected`

**option**
- `selected/unselected`
- `changed`
- `current`

Outgoing message types
---

**parent**
- `ready`
- `error`
- `changed`
- `current`
- `expanded/collapsed`

**if role matches 'button' | 'tab' | 'switch' | 'listbox' | 'option' | 'menuitem'**
- `click` 