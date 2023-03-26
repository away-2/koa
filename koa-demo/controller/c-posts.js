const userModel = require('../lib/mysql.js')
const moment = require('moment')

exports.getPosts = async (ctx, next) => {
    // console.log(ctx.session, '//////')
    // ctx.response.body = '文章'
    await ctx.render('posts', {
        session: ctx.session
    })
}

exports.getSinglePosts = async (ctx, next) => {
    let postId = ctx.params.postId;
    const result = await userModel.findDataById(postId)
    await userModel.updatePostPv(postId)
    const commentsCountResult = await userModel.findCommentCountById(postId)
    ctx.body = {
        user: ctx.session, 
        posts: result[0],
        commentsLength: commentsCountResult[0].count
    } 
}

exports.postCreate = async (ctx, next) => {
    console.log(ctx.session, '/////');
    const { title, content } = ctx.request.body,
    { id, user:name }= ctx.session,
    time = moment().format('YYYY-MM-DD HH:mm:ss');
    const userResult = await userModel.findDataByName(ctx.session.user)
    const avatar = userResult[0]['avatar']

    await userModel.insertPost([name, title, content, '- fdfdfdfdf',
    id, time, avatar])
    ctx.body = {
        code: 200,
        message: '发表文章成功'
    }
}