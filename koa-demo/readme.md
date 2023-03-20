- MVC
    - Model  数据层
    - View  视图层
    职责分离  MV  不能直接通信
    Control  来负责 逻辑计算  参数校验  中间过程的计算， 用户session...
    路由 后端路由， 用户从哪条路哪个method 进来， 
- KOA
    极简的node 开发框架
    - context = req + res
    - 中间件
        函数

## 后端思维
    MVVM -> MVC
    view  html  完整的html + DOM(原生js jquery)
- 3000
    后端安全的一部分？ 
    配置化

- 洋葱模型
    koa 提供服务和架构的本质， node服务器编程的简单
    123456 
    - 每个函数交给app.use 调用都是中间件  middleware
    - 每个middleware 中都能拿到 ctx next 等参数
    - 按照先后顺序执行   从上到下
    - 如果遇到  ctx.response.body 响应
        如果不是最后一个， 要给next
        最后一个的话， 它会沿着洋葱模型  执行一遍 
        不同的用户， 不同的任务， 不同的中间件需求
        数组 数据库链接中间件  肯定要在路由中间件前面
    - 如果到了最后一个中间件仍然没有结束， 它会沿着洋葱模型回溯执行

- koa 路由
    1. app.js  单点入口 模块化
    2. routers  目录 定义路由
        使用restful-api  名词 + 动词
        /posts GET  POST DELETE  PATCH  PUT
    3. 路由是作为中间件 启用
        ctx.req     请求头  http  版本号    url  method
        多个路由中间件
        如果url  method 和当前洋葱模型执行顺序里的路由中间件匹配， 进入控制器函数执行
        不匹配？how？ -》 next()