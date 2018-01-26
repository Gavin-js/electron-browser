const { session } = require('electron')
const md5 = require('./libs/md5')
const os = require('./libs/getmac')
const config = require('./config')
const nodeos = require('os')


//获取内网ip
const getLocalIp = () => {
    let INTERNAL_IP = ''
    var ifaces = nodeos.networkInterfaces()
    for (var dev in ifaces) {
      const ifacesObj = ifaces[dev][1] || ifaces[dev][0] || {}
        if(ifacesObj.address.indexOf('192.168') != -1) {
          return ifacesObj.address
        }
    }
    return INTERNAL_IP
}
const set = () => {

  const cookieUrl = config.loadURL
  const {
    COMPUTERNAME,
    PROCESSOR_ARCHITECTURE,
    PROCESSOR_IDENTIFIER,
    USERNAME
   } = process.env


  const cookieName = {
    COMPUTERNAME,
    PROCESSOR_ARCHITECTURE,
    PROCESSOR_IDENTIFIER,
    USERNAME,
  }

   const setCookie = (name,value)=>{
     return new Promise((resolve, reject) => {
       session.defaultSession.cookies.set({ url:cookieUrl,domain : "gavinjs.com", name : name, value : value}, function(error) {
         if (error){
           reject(error)
         }else{
           resolve()
         }
       })
     })
   }
  const INTERNAL_IP = getLocalIp()

  setCookie("INTERNAL_IP",INTERNAL_IP)

  let salt = []
   Object.keys(cookieName).map((key)=>{
     setCookie(key,cookieName[key]).catch((err)=>{
       console.log(err)
     })
     salt.push(`${key}=${cookieName[key]}`)
   })

  os.getMac(function(err,mac){
    if (err)  throw err
    setCookie("MAC",mac)

    salt.push(`MAC=${mac}`)

    salt.push(`salt=${config.salt}`)
    salt.sort()
    setCookie("gavinjs_client_sign",md5(salt.join('&')))
  })
}

module.exports = {
  set
}
