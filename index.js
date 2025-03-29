const express=require ('express')
const cors = require('cors')
const dotenv =require ("dotenv")
dotenv.config("./env")
const connectdb= require("./config/db")
const mongoose =require ("mongoose")

const cookieParser = require('cookie-parser')
const apiRouter=require("./routes/index.js")
const app = express()
const port = 3000

connectdb() //function to connect db
app.use(express.json())
app.use(cookieParser())
app.use(cors({origin:["http://localhost:5173","https://ecommerce-cohort-backend.vercel.app"],
          credentials:true,
          methods:["GET","POST","PUT","DELETE"]}))

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.use("/api", apiRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})