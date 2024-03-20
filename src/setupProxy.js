const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://localhost:8000',
      pathRewrite: {
        '^/api': '',
      },
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware('/media', {
      target: 'http://localhost:8000',
      changeOrigin: true,
    })
  );
};