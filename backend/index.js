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
const allowedOrigins = [
  'http://localhost:5174',
  'https://vamsidarling.github.io',
  'https://vamsidarling.github.io/Practice-projects'
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 86400 // 24 hours
}));

// Handle preflight requests
app.options('*', cors());

// Routes
app.use("/user", UserRouter)

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

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