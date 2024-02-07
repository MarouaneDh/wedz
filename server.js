const express = require('express')
const dbConnect = require("./config/connectDB");
require("dotenv").config();

const swagger = require('./swagger')

const userRouter = require("./routes/users");
const listRouter = require("./routes/lists");
const authRouter = require("./routes/auth");

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || '0.0.0.0'

// connect DB
dbConnect();

const app = express()

app.use(express.json())

swagger(app)

app.listen(PORT, HOST, () => {
    console.log(`listenning on PORT: ${PORT}`)
})

//body parse midware
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/list", listRouter);
app.use("/auth", authRouter);
