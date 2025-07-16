const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files with proper MIME types
app.use(express.static('.', {
    setHeaders: (res, path) => {
        // Set correct MIME types for JavaScript files
        if (path.endsWith('.js')) {
            res.set('Content-Type', 'application/javascript');
        }
    }
}));

// Serve index.html for root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'portfolio.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 