const Koa = require('koa')
const app = new Koa()
const mongoose = require('mongoose')
const { Eight } = require('./source')

// const config = {
//   hostname: 'localhost',
//   port: 3000,
// }

// app.use(async ctx => {
//   ctx.body = 'Hello World'
// })

// app.listen(config.port, config.hostname)

// console.info('Server is running at http://%s:%s . Press Ctrl+C to stop.', config.hostname, config.port)

// mongoose.connect('mongodb://localhost/garbage')

// const Garbage = mongoose.model('Garbage', { name: String, categoryId: String });

// const eight = new Eight()
// eight.run().then(res => {
//   const data = res[0].value
//   for (const i of data) {
//     Garbage.create({name:i, categoryId: '5e427fe8558c2a31cd450fbc'})
//   }
// })