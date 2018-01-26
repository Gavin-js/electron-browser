const electron = require('electron')
const { ipcMain,ipcRenderer } = electron

function triggerMenu (data) {
  ipcRenderer.sendToHost('contextmenu-data', data)
}

ipcRenderer.on('get-contextmenu-data', function (event,pos) {
  var data = {
    x: pos.x,
    y: pos.y,
    hasSelection: !!window.getSelection.toString(),
    href: false,
    img: false,
    video: false
  }

  var el = document.elementFromPoint(pos.x, pos.y)
  while (el && el.tagName) {
    if (!data.img && el.tagName == 'IMG')
      data.img = el.src
    if (!data.href && el.href)
      data.href = el.href
    el = el.parentNode
  }

  triggerMenu(data)
})
