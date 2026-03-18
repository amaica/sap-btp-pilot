const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 8080;
const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

function envDisplay() {
  const e = (process.env.ENV || 'dev').toLowerCase();
  return e.charAt(0).toUpperCase() + e.slice(1);
}

const server = http.createServer((req, res) => {
  if (req.url === '/' || req.url === '/index.html') {
    const body = html.replace('{{ENV_DISPLAY}}', envDisplay());
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(body);
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(port, () => {
  console.log('Listening on port', port);
});
