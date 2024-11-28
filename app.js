const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const NodeCache = require('node-cache');

// Routers
const indexRouter = require('./routes/api/v1/index');
const stockNewsRouter = require('./routes/api/v1/stockNews');

// Initialize app
const app = express();

// Cache
const cache = new NodeCache({ stdTTL: process.env.CACHE_TTL || 60 }); // Default TTL: 60 seconds

// Rate Limiter
const limiter = rateLimit({
  windowMs: process.env.RATE_LIMIT_WINDOW || 15 * 60 * 1000, // Default to 15 minutes
  max: process.env.RATE_LIMIT_MAX || 100, // Default to 100 requests
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Middlewares
app.use(logger(process.env.NODE_ENV === 'production' ? 'combined' : 'dev')); // Enhanced logging
app.use(cors({
  origin: process.env.CORS_ORIGINS || '*', // Restrict origins in production
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(limiter);

// Routes
app.use('/api/v1', indexRouter);
app.use('/api/v1', stockNewsRouter);


// catch 404 and forward to error handler
app.use((req, res, next) =>{
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // send the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;
