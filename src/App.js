import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navigation";
import HomeView from "./views/HomeView";
import AboutView from "./views/AboutView";
import ProductView from "./views/ProductView";
import WhyView from "./views/WhyView";
import FooterInfo from "./components/FooterInfo";
import ContactView from "./views/ContactView";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginView from "./views/LoginView";
import ProfileView from "./views/ProfileView";
import SignupView from "./views/SignupView";
import ForgotView from "./views/ForgotView";
import CartView from "./views/CartView";
import WishlistView from "./views/WishlistView";
import OrdersView from "./views/OrdersView";
import OrdersDetailView from "./views/OrdersDetailView";
import ShippingView from "./views/ShippingView";
import ThankyouView from "./views/ThankyouView";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="bottom-center" limit={1} />
      <Navbar />
      <Routes>
        <Route path="/thankyou" element={<ThankyouView />} />
        <Route path="/shipping" element={<ShippingView />} />
        <Route path="/detail/:id" element={<OrdersDetailView />} />
        <Route path="/orders" element={<OrdersView />} />
        <Route path="/wishlist" element={<WishlistView />} />
        <Route path="/cart" element={<CartView />} />
        <Route path="/profile" element={<ProfileView />} />
        <Route path="/why" element={<WhyView />} />
        <Route path="/product" element={<ProductView />} />
        <Route path="/about" element={<AboutView />} />
        <Route path="/contact" element={<ContactView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/signup" element={<SignupView />} />
        <Route path="/forgot" element={<ForgotView />} />
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
