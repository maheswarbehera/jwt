import bodyParser from "body-parser";
import express from "express";
import userRouter from "./routes/user.routes.js"; 

const app = express();
app.use(bodyParser.json())

app.use("/api/v1/user", userRouter)

app.get("/api/v1/",(req, res) => { 
    res.status(200).json(`Server running on http://localhost:${process.env.PORT}/api/v1/`)
})

export {app}