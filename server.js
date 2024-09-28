const express = require('express');
const app = express();

const PORT = 5000;
const HOST = '127.0.0.1';

let products = [];
let getRequestCount = 0;
let postRequestCount = 0;

// Middleware to parse JSON bodies
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`> ${req.path} ${req.method}: received request`);
  res.on('finish', () => {
    console.log(`< ${req.path} ${req.method}: sending response`);
    console.log(`Processed Request Count--> Get:${getRequestCount}, Post:${postRequestCount}`);
  });
  next();
});

// GET endpoint to retrieve products
app.get('/products', (req, res) => {
  getRequestCount++;
  res.json(products);
});

// POST endpoint to add a new product
app.post('/products', (req, res) => {
  postRequestCount++;
  const product = req.body;
  products.push(product);
  res.status(201).json({ message: 'Product added', product });
});

// DELETE endpoint to remove a product by ID
app.delete('/products/:productId', (req, res) => {
  const { productId } = req.params;
  products = products.filter(p => p.productId != productId);
  res.json({ message: 'Product deleted' });
});

// Start the server
app.listen(PORT, HOST, () => {
  const serverUri = `http://${HOST}:${PORT}`;
  console.log(`Server is listening at ${serverUri}`);
  console.log('Endpoints:');
  console.log(`${serverUri}/products method: GET, POST`);
  console.log(`${serverUri}/products/:productId method: DELETE`);
});
