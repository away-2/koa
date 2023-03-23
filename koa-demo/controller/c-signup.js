const userModel = require('../lib/mysql.js')

exports.getSignup = async ctx =>{
    // 显示注册页  view
    // ctx.response.body= '注册'
     let data = {
        title: '注册'
    }
    await ctx.render('signup',data)
 }
    

    const { name, password, repeatpass, avatar} = ctx
    if(!name){
        ctx.body ={
            code: 500,
            message: '用户名为空，请上传'
        }
        return 
    }
    if(!password){
        ctx.body ={
            code: 500,
            message: '密码为空，请上传'
        }
        return 
    }
    if(password != repeatpass){
        ctx.body ={
            code: 500,
            message: '密码输入不一致'
        }
        return 
    }
    if(!avatar){
        ctx.body ={
            code: 500,
            message: '头像为空，请上传'
        }  
        return 
    }
  
    try{
         const data = await userModel.findDataCountByName(name)
    }catch(err){
        ctx.body = {
            code: 500,
            msg: err
        }
    }
   
   

exports.postSignup = async ctx =>{
    // model
    console.log(ctx.request.body)
    ctx.body = 'post'
}