require("dotenv").config()
const express = require("express")
const mongoose =require("mongoose")
const { UserRouter} = require("./Routers/user")
const cors = require("cors")
const cookieParser = require("cookie-parser")

const app = express()

app.use(cookieParser());
app.use(express.json());


app.use(cors({
   origin: 'http://localhost:5173', // Your frontend origin
  credentials: true, // Allows cookies and authorization headers
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow necessary methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Allow necessary headers
}));


app.use("/user" , UserRouter )


async function main() {
	try
	{
	await mongoose.connect(process.env.MONGODB_URL);
	 console.log("connected to database ")
	app.listen(3000);
	console.log("running port successfully");
	}
	catch(err)
	{
		console.log("unbale to connect to the database\n",err);	
	}}
main();