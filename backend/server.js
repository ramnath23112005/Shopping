const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser'); // Needed to parse JSON body

const app = express();
const PORT = 5000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(bodyParser.json());

// Helper to read JSON files
const readJSON = (filename) =>
  JSON.parse(fs.readFileSync(path.join(__dirname, filename), 'utf-8'));

// Helper to write to JSON files
const writeJSON = (filename, data) =>
  fs.writeFileSync(path.join(__dirname, filename), JSON.stringify(data, null, 2), 'utf-8');

// === Data Readers ===
const getProducts = () => readJSON('products.json');
const getProductDetails = (id) => {
  const products = getProducts();
  return products.find(p => String(p.id) === String(id));
};
const getProductReviews = (id) => {
  const reviews = readJSON('reviews.json');
  return reviews[id] || [];
};
const getToggleImages = (id) => {
  const toggles = readJSON('toggle.json');
  return toggles[id] || [];
};

// === Cart Management ===
const CART_FILE = path.join(__dirname, 'cart.json');

// Helper function to write to cart.json
const writeCart = (cart) => {
  fs.writeFileSync(CART_FILE, JSON.stringify(cart, null, 2), 'utf-8');
};

// Initialize cart file if it doesn't exist
if (!fs.existsSync(CART_FILE)) {
  writeCart({});
}

// Get cart data
const getCart = () => {
  try {
    return readJSON(CART_FILE);
  } catch (error) {
    console.error('Error reading cart:', error);
    return {};
  }
};

// === ROUTES ===

// Get all products
app.get('/api/products', (req, res) => {
  try {
    res.json(getProducts());
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Get product with reviews
app.get('/api/products/:id', (req, res) => {
  const { id } = req.params;
  try {
    const product = getProductDetails(id);
    if (!product) return res.status(404).send('Product not found');

    const reviews = getProductReviews(id);
    res.json({ ...product, reviews });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Get toggle images for a product
app.get('/api/products/:id/toggle-images', (req, res) => {
  const { id } = req.params;
  try {
    const images = getToggleImages(id);
    res.json(images);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// === Cart Routes ===

// Add to cart
app.post('/api/cart/add', express.json(), (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const cart = getCart();

    if (cart[productId]) {
      cart[productId] += quantity;
    } else {
      cart[productId] = quantity;
    }

    writeCart(cart);
    res.json({ success: true, cart });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Remove from cart
app.post('/api/cart/remove', express.json(), (req, res) => {
  try {
    const { productId } = req.body;
    const cart = getCart();

    if (cart[productId]) {
      delete cart[productId];
      writeCart(cart);
      res.json({ success: true, cart });
    } else {
      res.status(404).json({ success: false, message: 'Product not in cart' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Get cart contents
app.get('/api/cart', (req, res) => {
  try {
    const cart = getCart();
    const products = getProducts();

    const cartContents = Object.entries(cart).map(([id, quantity]) => {
      const product = products.find(p => String(p.id) === String(id));
      return product ? { ...product, quantity } : null;
    }).filter(Boolean);

    res.json(cartContents);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// === 🧾 Payment route to save payment info ===
app.post('/api/pay', (req, res) => {
  const { productId, productName, price, user } = req.body;

  if (!productId || !productName || !price || !user) {
    return res.status(400).json({ error: 'Missing payment details' });
  }

  try {
    // Read existing payments or start with empty array
    let payments = [];
    const paymentFile = path.join(__dirname, 'payment.json');

    if (fs.existsSync(paymentFile)) {
      payments = readJSON('payment.json');
    }

    const newPayment = {
      id: payments.length + 1,
      productId,
      productName,
      price,
      user,
      timestamp: new Date().toISOString()
    };

    payments.push(newPayment);
    writeJSON('payment.json', payments);

    res.json({ message: 'Payment recorded', payment: newPayment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Payment processing failed' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


// Add these new routes before app.listen()

// Update cart item quantity
app.post('/api/cart/update', express.json(), (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cart = getCart();
    
    if (quantity <= 0) {
      delete cart[productId];
    } else {
      cart[productId] = quantity;
    }
    
    writeCart(cart);
    res.json({ success: true, cart });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Clear entire cart
app.post('/api/cart/clear', (req, res) => {
  try {
    writeCart({});
    res.json({ success: true, cart: {} });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});