require("dotenv").config()
const express = require("express")
const mongoose =require("mongoose")
const { UserRouter} = require("./Routers/user")

const app = express()
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