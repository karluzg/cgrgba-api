import * as express from "express";

// create and setup express app
const app = express()
app.use(express.json())
app.use("/users", require("./web-api/controller/UserController"))

// register routes

/*app.post("/users", async function (request: Request, response: Response) {
    
    const userserviceimpl =new UserServiceImpl()
   
    const params=new CreateUserParams(request.body.firstNamess, request.body.capital)
    const  result=  userserviceimpl.create_user(params)
    return response.send(result)
    
    //const CreateuserResult= await userEngine.create_user(req.body);
   // const user = await myDataSource.getRepository(User).create(req.body)
   // const results = await myDataSource.getRepository(User).save(user)
    //return res.send(results)
})
/*app.get("/users", async function (req: Request, res: Response) {
    const users = await myDataSource.getRepository(User).find()
    logger.info("User is:", users)
    res.json(users)
})

app.get("/users/:id", async function (req: Request, res: Response) {
    const results = await myDataSource.getRepository(User).findOneBy({
        id: Number(req.params.id)
    })
    return res.send(results)
})


app.put("/users/:id", async function (req: Request, res: Response) {
    const user = await myDataSource.getRepository(User).findOneBy({
        id: Number(req.params.id),
    })
    myDataSource.getRepository(User).merge(user, req.body)
    const results = await myDataSource.getRepository(User).save(user)
    return res.send(results)
})

app.delete("/users/:id", async function (req: Request, res: Response) {
    const results = await myDataSource.getRepository(User).delete(req.params.id)
    return res.send(results)
})*/

// start express server
app.listen(3000)