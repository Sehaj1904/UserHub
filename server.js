import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.svg': 'image/svg+xml'
};

const server = createServer(async (req, res) => {
    try {
        let path = req.url;
        if (path.match(/\.[^.]*$/)) {
            const filePath = join(__dirname, path);
            const ext = path.match(/\.[^.]*$/)[0];
            const contentType = MIME_TYPES[ext] || 'text/plain';

            const content = await readFile(filePath);
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        } else {
            const content = await readFile(join(__dirname, 'index.html'));
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content);
        }
    } catch (err) {
        if (err.code === 'ENOENT') {
            res.writeHead(404);
            res.end('Not found');
            return;
        }
        res.writeHead(500);
        res.end('Internal server error');
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
