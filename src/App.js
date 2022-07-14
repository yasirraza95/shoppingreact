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
import { ToastContainer } from 	'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginView from './views/LoginView';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="bottom-center" limit={1}/>
      <Navbar />
      <Routes>
        <Route path="/why" element={<WhyView />} />
        <Route path="/product" element={<ProductView />} />
        <Route path="/about" element={<AboutView />} />
        <Route path="/contact" element={<ContactView />} />
        <Route path="/login" element={<LoginView />} />
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
