
const Koa = require('koa');

const fs = require("fs")

const app = new Koa();

app.use(async (ctx,next) =>{
    let startTime = new Date().getTime();
    console.log("第一个中间件");
    await next();
    console.log("第一个中间件结束");
    let endTime = new Date().getTime();
    let time = endTime - startTime;
    fs.appendFileSync("./log.log",`${ctx.path}-${ctx.method}-${ctx.status}-${time}`)
    ctx.body = time;
})

app.use(async (ctx,next) => {
   console.log("第二个中间件");
   await next();
   console.log("第二个中间件结束")
})

let delay = () => {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve()
        },1000)
    })
}

app.use(async (ctx,next) => {
    console.log("第三个中间件");
    await delay()
 })

app.listen(3000,() => {
    console.log("服务启动成功")
})