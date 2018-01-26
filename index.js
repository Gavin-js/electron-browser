const electron = require('electron')
const { app,session,BrowserWindow } = electron
const path = require('path')
const url = require('url')
var mainWindow = null

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit()
  }
})

app.on('ready', function () {
  mainWindow = new BrowserWindow({
      width: 1030,
      height: 720,
      frame: false,
      icon:'./resources/icon.ico'
     })

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'browser.html'),
    protocol: 'file:',
    slashes: true
  }))
  mainWindow.on('closed', function() {
    mainWindow = null
  })
})
