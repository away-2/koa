const Koa = require('koa')
const config = require('./config/default')
const app = new Koa()
const signupRouter = require('./routers/signup')
const postsRouter = require('./routers/posts')

// 如何记录一个请求所花时间
// 启用中间件 第一个 计时开始
// app.use(async(ctx,next) =>{
//     console.log('中间件1')
//     const start = new Date().getTime();
//     await next();
//     const end = new Date().getTime();
//     console.log('请求花费时间为',end - start , 'ms')
// })

// app.use(async (ctx,next) =>{
//     console.log('中间件1')
//     const data = await getData()
//     ctx.body = {data}
// })

// const getData = async () =>{
//     await new Promise((resolve) =>{
//         setTimeout(() =>{
//             resolve();
//         },1000)
//     })
//     return '我给你买橘子cccc'
// }

// 洋葱模型
// 中间件为其服务
// blog 网站
// app.use((ctx,next) => {
//     console.log(1)
//     next()
//     console.log(6)
//     // 向下传
//     // ctx.response.body = '我给你买橘子aaaa'
// })
// app.use((ctx,next) => {
//     console.log(2)
//     // ctx.response.body = '我给你买橘子bbbb'
//     next()
//     console.log(5)
// })
// app.use((ctx,next) => {
//     console.log(3)
//     // ctx.response.body = '我给你买橘子'
//     next()
//     console.log(4)
// })


app.use(signupRouter.routes())
app.use(postsRouter.routes())
app.listen(config.port)

console.log(`listening on port ${config.port}`)
