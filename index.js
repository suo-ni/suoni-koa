const Koa = require("koa")
const app = new Koa()
const router = require("koa-router")()
const query = require("./db/index")
app.use(router.routes())
app.use(router.allowedMethods())

router.get("/userlist",async (ctx)=>{
    let data = await query()
    ctx.body = {
        code:1,
        data
    }
    //  ctx.body = [1,2,3]
})

app.listen(3000,()=>{
    console.log("服务被启动");
})