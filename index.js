const http = require('http');
const fs = require('fs');
// server properties
const hostname = '127.0.0.1';
const port = 3000;
const timer = 300;

//should trigger atualize function every timer parameter
let htmlfile = '';
let cssfile = '';
let jsfile = '';
let jpgfile = '';


uptodate();

// should read file from the disk for html
function uptodate()
{
  console.log(1);
   fs.readFile('./index.html', function (err, html) {
    if (err) {
      throw err; 
    }       
    htmlfile = html;
    jpgfile= html;
  });

  // should read css from the disk for css
   fs.readFile('./style.css', function (err, html) {
    if (err) {
      throw err; 
    }       
    cssfile = html;
  });

  // should read js file from the disk
  fs.readFile('./app.js', function (err, html) {
    if (err) {
      throw err; 
    }       
    jsfile = html;
  });
  fs.readFile('./img/welcome.jpg', function (err, html) {
    if (err) {
      throw err; 
    }       
    jpgfile = html;
  });



  setTimeout(function(){ uptodate(); }, 1000);
}
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  

  // should send css and js
  if(req.url.indexOf('.css') != -1){ //req.url has the pathname, check if it conatins '.js'
   res.writeHead(200, {'Content-Type': 'text/css'});
   res.write(cssfile);
   res.end();
   return;
  }
  if(req.url.indexOf('.jpg') != -1){ //req.url has the pathname, check if it conatins '.js'
  res.writeHead(200, {'Content-Type': 'image/jpg'});
  res.write(jpgfile);
  res.end();
  return;
 }

  if(req.url.indexOf('.js') != -1){ //req.url has the pathname, check if it conatins '.js'
   res.writeHead(200, {'Content-Type': 'text/javascript'});
   res.write(jsfile);
   res.end();
   return;
  }
  // should send html file via request
  res.writeHeader(200, {"Content-Type": "text/html"});  
  res.write(htmlfile);
  res.end();
});

// should send css and js 

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});



