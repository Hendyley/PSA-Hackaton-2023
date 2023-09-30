const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // Set the content type to HTML
    res.setHeader('Content-Type', 'text/html');

    // Read the HTML file and send it as the response
    fs.readFile(path.join(__dirname, 'dummy.html'), (err, data) => {
        if (err) {
            // Handle errors (e.g., file not found)
            res.writeHead(404);
            res.end('Not Found');
        } else {
            res.writeHead(200);
            res.end(data);
        }
    });
});

// Listen on port 3000 (you can choose a different port)
const port = 3000;
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
