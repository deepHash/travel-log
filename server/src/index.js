const express = require('express'),
      morgan  = require('morgan'),
      helmet  = require('helmet'),
      cors    = require('cors'),

      middlewares = require('./middlewares'),

      app = express(),
      port = process.env.PORT || 1337;

app.use(morgan('common'));
app.use(helmet());
app.use(cors());


app.get('/', (req,res) => {
    res.json({
        message: 'Hello World!'
    });
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
});