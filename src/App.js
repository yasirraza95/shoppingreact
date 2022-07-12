import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navigation';
import HomeView from './views/HomeView';
import AboutView from './views/AboutView';
import ProductView from './views/ProductView';
import WhyView from './views/WhyView';
import FooterInfo from './components/FooterInfo';
import ContactView from './views/ContactView';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/why" element={<WhyView />} />
        <Route path="/product" element={<ProductView />} />
        <Route path="/about" element={<AboutView />} />
        <Route path="/contact" element={<ContactView />} />
        <Route path="/" element={<HomeView />} />
      </Routes>
      <div>
        <FooterInfo />
        <Footer />
      </div>
      
    </BrowserRouter>
  );
}

export default App;
