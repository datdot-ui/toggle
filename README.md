# datdot-ui-toggle
DatDot vanilla js UI component

Opts
---

`{name = 'toggle', text, icons = [], state = default_state, theme = ``}`

Help
---
`toggle.help()` returns opts & the defaults for toggle component


Incoming message types
---

- `help` requests info on current state
- `update` updates any of the data sent `{ text, icons = [], sheets }`

Outgoing message types
---

**parent**
- `help` sends info on current state
- `click` // sends info about the state (data.pressed true/false)