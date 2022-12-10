import NavBar from "./commponents/navbar";
import Home from "./pages/home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./commponents/footer";
import Products from "./pages/products";
import ProductDetails from "./pages/productDetails";
import Register from "./pages/register";
import Cart from "./pages/cart";
import Profile from "./pages/profile";
import ProtectedRoute from "./commponents/protectedRoutes";

import { UserAuthContextProvider } from "./store/auth-context";
import { WishListContextProvider } from "./store/wishList-context";
import { CartContextProvider } from "./store/cart-context";

function App() {
  return (
    <BrowserRouter>
      <UserAuthContextProvider>
        <WishListContextProvider>
          <CartContextProvider>
            <NavBar />
            <Routes>
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/products" element={<Products />} />
              <Route path="/login" element={<Register />} />
            </Routes>
            <Footer />
          </CartContextProvider>
        </WishListContextProvider>
      </UserAuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
