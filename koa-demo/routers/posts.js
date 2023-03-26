const routers = require('koa-router')();
const controller = require('../controller/c-posts')
// restful-api ?
routers.get('/posts',controller.getPosts)
// 单篇文章详情页
routers.get('/posts/:postId', controller.getSinglePosts)
// 发表文章
routers.post('/create',controller.postCreate)

module.exports = routers