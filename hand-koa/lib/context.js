let proto = {}  // koa 优雅所在   方法  属性挂载在这个对象上
// proto.__proto__ = request
function defineGetter(prop, name) { // 要代理的对象和对象上的属性
    proto.__defineGetter__(name, function() {  // 每个对象上都有defineGetter
        return this[prop][name]   // ctx.url  ctx.request.url
    })
}
defineGetter('request','url')
defineGetter('request','path')
module.exports = proto