/*****************************************************************************
** Project: PIXELDIVS Final Project
** Authors: Chitali Buge, Chih-Yun Wu, Andrew Johnson, and Alyssa Pratt
** Date: 18 May 2020
** Description: This is the JavaScript that handles all interactions with
** the server.
*****************************************************************************/

/*****************************************************************************
** Function: getHTML
** Description: Interprets a user request to the server based upon the URL
** requested and sends a proper response with the correct content
** Parameters: request is all the information the user is sending, response
** is all the data the server is sending
** Preconditions: User has made a request to the server
** Postconditions: User has recieved the correct content
*****************************************************************************/
function getHtml (request, response) {
	console.log(request.url);
	if (request.url == "/home.html" || request.url == "/") {
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write(homeContent);
	}
	else if (request.url == "/index.html") {
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write(htmlContent);
	}
	else  if (request.url == "/style.css") {
		response.writeHead(200, {"Content-Type": "text/css"});
		response.write(cssContent);
	}
	else  if (request.url == "/index.js") {
		response.writeHead(200, {"Content-Type": "application/javascript"});
		response.write(jsContent);
	}
	else  if (request.url == "/home.js") {
		response.writeHead(200, {"Content-Type": "application/javascript"});
		response.write(homejsContent);
	}
	else  if (request.url == "/404.html") {
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write(error404);
	}
	else {
		response.writeHead(404, {"Content-Type": "text/html"});
		response.write(error404);
	}
	response.end();
}


/*****************************************************************************
** Function: serverStart
** Description: This is the function called immediately once the server is
** opened and listening on a port.
** Parameters: None
** Preconditions: The server is started up and is listening on a port
** Postconditions: Status of the server is ouputted to the console
*****************************************************************************/
function serverStart () {
	console.log("Server is running on port 3000");
}


/* Require all necessary functions */
var http = require("http");
var fs = require('fs');

/* Set the function getHTML to be called when server runs */
var server = http.createServer(getHtml);

// Create all global variables
var htmlContent;
var error404;
var cssContent;
var jsContent;
var homeContent;
var homejsContent;

/* Read all data into variables */
fs.readFile("public/home.html", "utf8", function(err, data) {
	if (err) {
		console.log("Could not read HTML file");
	}
	else {
		homeContent = data;
		console.log("Home HTML content retrieved");
	}
});

fs.readFile("public/index.html", "utf8", function(err, data) {
	if (err) {
		console.log("Could not read HTML file");
	}
	else {
		htmlContent = data;
		console.log("Index HTML content retrieved");
	}
});

fs.readFile("public/404.html", "utf8", function(err, data) {
	if (err) {
		console.log("Could not read 404 file");
	}
	else {
		error404 = data;
		console.log("404 content retrieved");
	}
});

fs.readFile("public/style.css", "utf8", function(err, data) {
	if (err) {
		console.log("Could not read CSS file");
	}
	else {
		cssContent = data;
		console.log("CSS content retrieved");
	}
});

fs.readFile("public/index.js", "utf8", function(err, data) {
	if (err) {
		console.log("Could not read JavaScript file");
	}
	else {
		jsContent = data;
		console.log("Index JavaScript content retrieved");
	}
});
fs.readFile("public/home.js", "utf8", function(err, data) {
	if (err) {
		console.log("Could not read JavaScript file");
	}
	else {
		homejsContent = data;
		console.log("Home JavaScript content retrieved");
	}
});

/* This opens the server on port 3000 of the host. This MUST be placed at the
 * end of this file to ensure the server has successfully started up before
 * accepting user requests
 */
server.listen(process.env.PORT || 3000, serverStart);

// END OF FILE
