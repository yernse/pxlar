const http = require('http');
const https = require('https');
const url = require('url');

const server = http.createServer((req, res) => {
    const reqUrl = req.url.slice(1);
    const options = url.parse(reqUrl);
    options.headers = req.headers;
    
    const protocol = options.protocol === 'https:' ? https : http;

    const proxyReq = protocol.request(options, (proxyRes) => {
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        proxyRes.pipe(res, {
            end: true
        });
    });

    req.pipe(proxyReq, {
        end: true
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Proxy server running on port ${PORT}`);
});

