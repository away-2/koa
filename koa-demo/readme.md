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

- koa view 层
    1. 传统的MVC 
        经典的后端架构方案和设计模式
        router -> controller(数据准备， 逻辑) -> views (html)
    2. ctx.render 
        ctx -> 上下文环境  req + res
        省略 response
        ctx.render = ctx.response.render
    3. views 目录和view 层
        需要配置
    4. 使用ejs 模板引擎
        {{}}
        <%= %>
        for 
        模板编译后 完整的输出给浏览器
        前后端分离 只有一个挂载点 vue component 动态
        - MVVM 大型项目， 大公司团队协作
            前后端分离 更合适 应用打开更快， 体验好，  不会摆平一下
        - 前后端分离缺点？
            SEO  极其差    #root  百度  不会解析js  ajax  数据
            对于手机app 里  无所谓SEO 的 体验为先 Mobile First
            掘金  csdn  搜狐   非常在乎SEO  不合适
            掘金要放弃vue MVVM  回归MVC 吗？
            服务器端渲染的VUE  Nuxt 
        - MVC 有点SEO
        - koa-views views 中间件 挂载在app上 
            - 配置views 所在
                ctx.render  指定模板的名字
            - 指定模板引擎  ejs  pug
                <%= %>
            - 洋葱模型顺序  views 中间件  功能准备型中间件  放置在路由中间件前面
        - ctx.render
            模板在服务器端编译  返回所有的html  对SEO 很友好
                爬虫  也是通过发送请求来建立内容分析 curl 
        - PC 端入口在百度
        - 移动端在应用市场 MVVM

- meta viewport 
    head 中 meta 通常用于丰富页面的信息和属性
    description
    keywords 掘金，稀土，Vue.js,前端面试题，Kotlin,ReactNative,Python
    viewport 用于适配 PC 端不用，
    移动端 width=device-width, initial-scale=1.0, user-scalable=no
    乔布斯iphone开创了移动时代，PC更多， user-scalable 两个手指缩放页面
    1024px  pc  -> 750 手机   很小？ 很大
    现在过时了  Mobile First user-scalable=no  禁用缩放
    缩放有时候会误操作  触发回到上一页  下一页  
    www.taobao.com   ->  m.taobao.com   301
    PC   一套   nuxt
    mobile  SPA

- 静态资源koa处理
    - css  js  image  静态资源
        - 不归路由(逻辑，数据库，服务器端内存等)管  服务器集群中
        - 前端写的绝大多数都是静态资源 webpack  vite  打包  dist/
            未来会单独放在cdn 服务器  前端缓存
    - 单独处理静态资源路由
    - http://localhost:3000/index.css
        静态服务器 + 缓存 koa-static-cache
        - / 在动态服务器（路由）里面， 进入首页
        - / 在静态服务器中   静态服务器中间件放在  路由前面
            / -> 配置的  /public
        - 时间内，  客户端不用再请求， http 优化的重要理解
            200  第一次
            2..  304  Not Modified
            maxAge  一定会去服务器再请求， 再更新

- 登录的用户体验
    - keyup 事件  enter  提交  手机  Enter  虚拟键盘
    - 做好校验
        前端做了(用户体验， 及时提醒)，后端还要做(js可以被禁用， 后端不信任前端传的数据)  为了数据安全 
        密码重复  在前端后端都要做  后端对数据安全负第一责任
        
- 文件对象是html5的重大功能
    - 提供了File 对象
        文件在上传到服务器之前，就可以访问到本地的文件  类型  大小  等
    - 提供了FileReader 对象
        异步的从硬盘读取内容到内存，  以url， base64  blob
        看到图片， 上传 
        文件大小  比较大  用户等好久才能上传完， 如果没有交互体现正在上传的话，
        用户会很焦虑 

- bodyParser 中间件
    post 请求和 GET 请求不一样
    GET 查询参数  在请求行  就已到位
    POST 请求体，(请求头信息有length) 分段传输  路由中间件之前要加 请求数据包收集中间件
    bodyParser   await 收集 == length next()
    1 next()    2

- node 做后端
    优点是 异步 与其他后端语言不一样的 性能好， no blocking 
    一台服务器， 上限是同时在线5000人， 并发nginx/tomcat 
    php/Java/python  同步的  blocking 在sql请求(I/O)耗时任务中  占据线程
    node 异步的， 有event loop  在sql请求(I/O)耗时任务中  进入event loop
    nginx/tomcat    线程就会被释放  不会阻塞  no blocking
    省掉很多服务器   支持高并发
    java c++ 多线程  
    node  单线程  服务器易崩   所有用户都不响应  try catch 
    pm2  进程管理工具 

- 文件上传
    1. 上传到服务器端 
        放到哪个文件夹呢？ static-catch  静态服务器，  
        缓存  /public/images/
    2. 可以访问的
        静态服务器 
    3. fs  模块  写入  

- mysql 业务处理方式   mysql -u root -p
    1. MVC 中的model 层
        lib/mysql.js  简版
        在控制器中调用
    2. 数据库驱动 mysql2  翻译  
        驱动mysql  微程序工作 I/O
        createPool
        getConnection  连接数据库
        release   断开数据库
    3. 封装了通用的query 方法  sql  data
    4. 提供了各种业务  sql 封装函数
        - 检测users表是否有某用户  select count(*)
        - 插入一条用户记录  insert into 

- 登录功能的细节
    GET /signin  表单
    验证表单
    ajax 提交表单  POST /signin { }
    bodyParser post 表单
    后台登录路由
    后台登录控制器
    后端验证参数
    sql  查询操作
    种cookie  session  

    http  带上cookie  session 解析出相应的对象

- cooie session  jwt
    1. cookie  每次都会带上http
        文本，  不能太大， 影响http的性能
    2. cookie 在客户端和后端都可写可读
    3. 登录时， 服务器 ctx.session  同时， 自动设置cookie = 
    USER_SID=session_id 值
        session(会话对象  id name   大一点， 在后端内存中)  依赖于cookie 而生
    4. session 中间件  会使用cookie  USER_SID 解析
    session_id
        去session池子里  找到属于用户的session  对象ctx.session
    5. 任何需要鉴权的地方， ctx.session 有没有值  就可以了

- cookie  数据存放在用户的浏览器上，  session 数据放在服务器上
- cookie 很不安全  HttpOnly   true  js  代码里拿不到 http  还会带上
    domin  + path  同源策略 / 任何路径
    Expires  自动过期
    SameSite 
    为了安全，  考虑session
- session 在一定时间内保存在服务器上，  占内存， 多了会影响服务器端性能
- cookie  单个  不能超过 4K   不能超过20个cookie

- 为什么jwt 这种方案， 新的主流？
    1. cookie  不安全
    2. cookie 性能不好
    3. token 小，生成 json 对象   session要那么多空间
    
- 关系型数据库
MYSQL  SQLServer  表关联
User 1 n  Posts
Posts  1  n  Comments
Key    Primary  Key  Uniq Key  Foregin  Key
Key  组合   查询业务的频繁度
索引 在内存中
- NOSQL
- 数据冗余
name 有利于列表页单表查询 

- 中间件登录检测方案
    1. 在后端项目架构中  middlewares  是自定义中间件的所在
    2. 登录校验也可以和session， bodyParser ...  可以视为一个独立的中间件， 在路由发生时， 在controller 前面
    './path',checkLogin, , controller.
    中间件的本质是数组  有顺序， 可以放一堆
    3. 有利于复用

- 内容安全
    1. 不要相信用户的输入
    2. 用户有可能输入js 代码， 甚至是sql
       cookie 盗用  
    3. <script> 标签  要么删除要么转译

- ctx.redirect 底层啥意思？
    重定向 
    301 Moved Permanently  永久重定向   http -> https
    浏览器有缓存 
    jd.com  360buy.com (老用户)
    服务器端返回的响应头
    Status Code  301
    Location：www.jd.com 
    302 Found
    资源临时移动到新的URI上
    303 See other
    将POST 请求重定向到GET 请求， 
    307 Temporary Redirect
    跟302 差不多， 307状态码不允许浏览器将原本为POST 的请求重定向到GET 请求上

    - http 编码
    对请求uri  进行编码
    中文一定会被自动编码  ?name=老用户
    服务器端  decodeURIComponent
    

    





