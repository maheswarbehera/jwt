import bodyParser from "body-parser";
import express from "express";
import userRouter from "./routes/user.routes.js"; 

import cors from "cors"; 
import { logger } from "./middlewares/log.middlware.js";

const app = express();
app.use(bodyParser.json())
app.use(logger)

app.use(cors());
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use("/api/v1/user", userRouter)

app.get("/api/v1/",(req, res) => { 
    res.status(200).json(`Server running on http://localhost:${process.env.PORT}/api/v1/`)
})

export {app}