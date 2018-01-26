
const env = 'product'

const loadURL = {
  'test':'http://www.gavinjs.com',
  'product':'http://www.j--d.com',
}
const salt = "18959+5625syjke899898df"

module.exports = {
  useragent:"electron-browser window",
  loadURL:loadURL[env],
  salt,
}
