const userModel = require('../lib/mysql.js')
const moment = require('moment')
const md = require('markdown-it')()
const checkLogin = 
require('../middlewares/check.js').checkLogin

exports.getRedirectPosts = async(ctx) => {
ctx.redirect('/posts');
}

exports.getPosts = async (ctx, next) => {
    let res,
    postCount,
    name = ctx.request.querystring? 
    decodeURIComponent(ctx.request.querystring.split('=')[1])
    :'';
    console.log(ctx.request.querystring, name, '/////')
    // /posts?name=山城小辣椒
    if (name) {
    // 哪个用户的文章
       const postCountData = await userModel.findPostCountByName(name)
       const postCount = postCountData[0].count
    //    console.log(postCount)
       const postData = await userModel.findPostsByUserPage(name, 1)
    //    console.log(postData)
      await ctx.render('selfPosts', {
        session: ctx.session,
        posts: postData,
        postsPageLength: Math.ceil(postCount / 1)
      })
    } else {
    // 第一页的文章
    const postData = await userModel.findPostsByPage(1)
    // console.log(data)
    const postCountData = await userModel.findAllPostCount()
    await ctx.render('posts', {
        session: ctx.session,
        posts: postData,
        postsLength: postCountData[0].count,
        postsPageLength: Math.ceil(postCount /1)
    })
    }
    // console.log(ctx.session, '//////')
    // ctx.response.body = '文章'
    // await ctx.render('posts', {
    //     session: ctx.session
    // })
}

exports.getSinglePosts = async (ctx, next) => {
    let postId = ctx.params.postId;
    const result = await userModel.findDataById(postId)
    await userModel.updatePostPv(postId)
    const commentsCountResult = await userModel.findCommentsCountById(postId)
    // ctx.body = {
    //     user: ctx.session, 
    //     posts: result[0],
    //     commentsLength: commentsCountResult[0].count
    // } 
    await ctx.render('sPost', {
        session: ctx.session,
        posts: result[0],
        commentsLength: commentsCountResult[0].count
    })
}

exports.getCreate = async (ctx, next) => {
    // 登录校验  中间件 
    await ctx.render('create', {
        session: ctx.session
    })
}

exports.postCreate = async (ctx, next) => {
    console.log(ctx.session, '/////');
    let { title, content } = ctx.request.body,
    { id, user:name }= ctx.session,
    time = moment().format('YYYY-MM-DD HH:mm:ss');
    const userResult = await userModel.findDataByName(ctx.session.user)
    const avatar = userResult[0]['avatar']
    // JS 攻击 SQL 注入  转译， 安全  html显示没问题
    title = title.replace(/[<">']/g, (target) => {
         return {
            '<': '&lt;',
            '>': "&gt;",
            '"': '&quot;',
            "'": '&#39;'
         }[target]
    })
    content = content.replace(/[<">']/g, (target) => {
        return {
           '<': '&lt;',
           '>': "&gt;",
           '"': '&quot;',
           "'": '&#39;'
        }[target]
   })
    await userModel.insertPost([name, title, content, md.render(content),
    id, time, avatar])
    ctx.body = {
        code: 200,
        message: '发表文章成功'
    }
}