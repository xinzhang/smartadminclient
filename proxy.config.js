const Agent = require('agentkeepalive');

module.exports = {  
        '/api': {
            target: 'http://localhost:54560',
            secure: false,
            agent: new Agent({
                maxSockets: 100,
                keepAlive: true,
                maxFreeSockets: 10,
                keepAliveMsecs: 100000000,
                timeout: 6000000000,
                keepAliveTimeout: 90000000
            }),
            onProxyRes: proxyRes => {
                let key = 'www-authenticate';
                proxyRes.headers[key] = proxyRes.headers[key] &&
                    proxyRes.headers[key].split(',');
            }
        }
};