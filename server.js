const express = require('express');
const next = require('next');

const port = +process.env.port || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get('/cast/:personId', (req, res) => {
    const { personId } = req.params;
    console.log('TCL: req.params', req.params);
    return app.render(req, res, '/cast', { personId });
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) {
      throw err;
    }
    console.log('server ready');
  });
});
