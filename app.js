const express = require('express');
const promClient = require('prom-client');

const app = express();
const port = 3000;

// Create a Registry to register the metrics
const register = new promClient.Registry();

// Create a counter metric
const httpRequestsTotal = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'path', 'status'],
});

// Register the metric
register.registerMetric(httpRequestsTotal);

// Middleware to increment the counter for each request
app.use((req, res, next) => {
  res.on('finish', () => {
    httpRequestsTotal.inc({
      method: req.method,
      path: req.path,
      status: res.statusCode,
    });
  });
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});