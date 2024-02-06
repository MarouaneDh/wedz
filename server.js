const express = require('express')
const dbConnect = require("./config/connectDB");
require("dotenv").config();

const userRouter = require("./routes/users");
const listRouter = require("./routes/lists");
const authRouter = require("./routes/auth");

const PORT = process.env.PORT || 6000

// connect DB
dbConnect();

const app = express()

app.listen(PORT, () => {
    console.log(`listenning on PORT: ${PORT}`)
})

//body parse midware
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/list", listRouter);
app.use("/api/auth", authRouter);
