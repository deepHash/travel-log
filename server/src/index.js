const express = require('express'),
      morgan = require('morgan'),
      helmet = require('helmet'),
            
      app = express(),
      port = process.env.PORT || 1337;

app.use(morgan('common'));


app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
});