// panggil file source
const { Client } = require('./dist/Client')

// setting konfigurasi
const wa = new Client('01', 'your-token-here')

// class action (promise)
wa.deviceInfo()
.then(res => console.log(res.data))
.catch(err => console.error(err))