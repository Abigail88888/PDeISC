// server.mjs
    import { createServer } from 'node:http';
    import { loadEnvFile } from 'node:process';
    const server = createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<table style= "color: black">uno</table>');
    });
// starts a simple http server locally on port 3000
    server.listen(8086, '127.0.0.1', () => {
        console.log('sali');    
    });
// run with `node server.mjs`