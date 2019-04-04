// This script is only for localhosting the project
// --

// ----------------
// - Dependencies -
// ----------------

const http = require('http');
const fs = require("fs");
var path = require('path');
const opn = require('opn');

// --------------------
// - Global Constants -
// --------------------

const hostname = '127.0.0.1';
const port = 3000;
const build_path = './build/';

// ---------------------
// - Private Functions -
// ---------------------

function getContentType(extension_name) {
	switch (extension_name) {
	    case '.js':
	        return 'text/javascript';
	    case '.css':
	        return 'text/css';
	    case '.json':
	        return 'application/json';
	    case '.png':
	        return 'image/png';
	    case '.jpg':
	        return 'image/jpg';
	    case '.pdf':
	    	return 'application/pdf';
	    case '.wav':
	        return 'audio/wav';
	    default:
	    	return 'text/html';
	}
}

// -----------------
// - Create Server -
// -----------------

const server = http.createServer((request, response) => {
	if (request.url == '/') {
	    var filePath = build_path + 'home';
	} else {
		var filePath = build_path + request.url;
	}

	const contentType = getContentType(path.extname(filePath));

	if (contentType === 'text/html') {
		filePath += '.html';
	}

	fs.readFile(filePath, function(error, content) {
	    if (error === null) {
	    	response.writeHead(200, { 'Content-Type': contentType });
	    	response.end(content, 'utf-8');
	    	return true;
	    }

        if (error.code == 'ENOENT'){
            fs.readFile(build_path + '404.html', function(error, content) {
                response.writeHead(404, { 'Content-Type': 'text/html' });
                response.end(content, 'utf-8');
            });
        } else {
            response.writeHead(500);
            response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
            response.end();
        }
	});
});

server.listen(port, hostname, () => {
	const my_url = `http://${hostname}:${port}/`;
	console.log(`Server running at ${my_url}`);
	opn(my_url);
});
