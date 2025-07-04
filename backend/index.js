require("dotenv").config({path: './properties.env'})
const express = require("express")
const mongoose = require("mongoose")
const { UserRouter } = require("./Routers/user")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const helmet = require("helmet")
const compression = require("compression")
const rateLimit = require("express-rate-limit")
const morgan = require("morgan")

const app = express()

app.use(cookieParser());
app.use(express.json());
app.use(helmet())

// CORS configuration

app.use(cors({
  origin: [process.env.FRONTEND_URL1 ,process.env.FRONTEND_URL],
  credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
//   exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 86400 // 24 hours
}));


// Routes
app.use("/user", UserRouter)


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// Request timeout
app.use((req, res, next) => {
  req.setTimeout(5000, () => {
    res.status(408).json({ message: 'Request timeout' });
  });
  next();
});

async function main() {
	try
	{
	await mongoose.connect(process.env.MONGODB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});
	 console.log("connected to database ")
	 const PORT = process.env.PORT || 3000;
	 app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
	 });
	}
	catch(err)
	{
		console.log("unable to connect to the database\n",err);	
	}}
main();