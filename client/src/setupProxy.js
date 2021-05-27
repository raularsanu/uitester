const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/auth/register", { target: "http://localhost:5000/" })
  );
  app.use(
    createProxyMiddleware("/auth/login", { target: "http://localhost:5000/" })
  );
  app.use(
    createProxyMiddleware("/auth/logout", { target: "http://localhost:5000/" })
  );
  app.use(
    createProxyMiddleware("/currentuser", { target: "http://localhost:5000/" })
  );
  app.use(
    createProxyMiddleware("/upload-file", { target: "http://localhost:5000/" })
  );
  app.use(
    createProxyMiddleware("/upload-test", { target: "http://localhost:5000/" })
  );
  app.use(
    createProxyMiddleware("/user-tests", { target: "http://localhost:5000/" })
  );
  app.use(
    createProxyMiddleware("/tests", { target: "http://localhost:5000/" })
  );
  app.use(
    createProxyMiddleware("/images/:filename", { target: "http://localhost:5000/" })
  );
  app.use(
    createProxyMiddleware("/update-test", { target: "http://localhost:5000/" })
  );
};