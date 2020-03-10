const express = require('express'),
      morgan  = require('morgan'),
      helmet  = require('helmet'),
      cors    = require('cors'),

      middlewares = require('./middlewares'),
      logs = require('./api/logs'),
      
      app = express(),
      port = process.env.PORT || 1337;
      
      result = require('dotenv').config();


app.use(morgan('common'));
app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN,
}));
app.use(express.json());


app.get('/', (req,res) => {
    res.json({
        message: 'Hello World!'
    });
});

app.use('/api/logs', logs);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
});