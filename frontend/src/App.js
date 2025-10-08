import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './components/pages/Cart/CartContext'; // Single import of CartProvider
import Navbar from './components/pages/FootNav/Navbar';
import Footer from './components/pages/FootNav/Footer';
import AboutPage from './components/pages/FootNav/FooterLinks/AboutPage';
import CareersPage from './components/pages/FootNav/FooterLinks/CareerPage';
import PressReleasesPage from './components/pages/FootNav/FooterLinks/PressReleasesPage';
import AmazonSciencePage from './components/pages/FootNav/FooterLinks/AmazonSciencePage';
import ConnectWithUsPage from './components/pages/FootNav/FooterLinks/ConnectWithUsPage';
import SellOnAmazonPage from './components/pages/FootNav/FooterLinks/SellOnAmazonPage';
import ProtectYourBrandPage from './components/pages/FootNav/FooterLinks/ProtectYourBrandPage';
import FulfilmentByAmazonPage from './components/pages/FootNav/FooterLinks/FulfilmentByAmazonPage';
import YourAccountPage from './components/pages/FootNav/FooterLinks/YourAccountPage';
import ReturnsCentrePage from './components/pages/FootNav/FooterLinks/ReturnsCentrePage';
import RecallsPage from './components/pages/FootNav/FooterLinks/RecallsPage';
import PurchaseProtectionPage from './components/pages/FootNav/FooterLinks/PurchaseProtectionPage';
import AmazonAppPage from './components/pages/FootNav/FooterLinks/AmazonAppPage';
import HelpPage from './components/pages/FootNav/FooterLinks/HelpPage';
import HomePage from './components/HomePage';
import ProductDetailsPage from './components/pages/ProductDetails/ProductDetailsMain';
import Cart from './components/pages/Cart/Cart'; // Import Cart component

const App = () => {
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/suggested-products')
      .then((response) => response.json())
      .then((data) => {
        setSuggestedProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching suggested products:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <CartProvider>
      <Router>
        <div>
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/press-releases" element={<PressReleasesPage />} />
              <Route path="/amazon-science" element={<AmazonSciencePage />} />
              <Route path="/connect-with-us" element={<ConnectWithUsPage />} />
              <Route path="/sell-on-amazon" element={<SellOnAmazonPage />} />
              <Route path="/protect-and-build-your-brand" element={<ProtectYourBrandPage />} />
              <Route path="/fulfilment-by-amazon" element={<FulfilmentByAmazonPage />} />
              <Route path="/your-account" element={<YourAccountPage />} />
              <Route path="/returns-centre" element={<ReturnsCentrePage />} />
              <Route path="/recalls-and-product-safety-alerts" element={<RecallsPage />} />
              <Route path="/purchase-protection" element={<PurchaseProtectionPage />} />
              <Route path="/amazon-app-download" element={<AmazonAppPage />} />
              <Route path="/help" element={<HelpPage />} />
              <Route
                path="/product/:id"
                element={<ProductDetailsPage suggestedProducts={suggestedProducts} />}
              />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;