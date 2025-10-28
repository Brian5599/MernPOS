import { createRoot } from "react-dom/client";
import "./App.css";
import App from "./App.jsx";
import "flowbite";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/features/store.js";
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Profile from "./pages/Auth/Profile.jsx";
import AdminRoute from "./pages/Admin/AdminRoute.jsx";
import Userlist from "./pages/Admin/Userlist.jsx";
import Home from "./pages/Home.jsx";
import Categorylist from "./pages/Admin/Categorylist.jsx";
import Brandlist from "./pages/Admin/Brandlist.jsx";
import Productlist from "./pages/Admin/Productlist.jsx";
import CreateProduct from "./pages/Admin/CreateProduct.jsx";
import Favourites from "./pages/Products/Favourites.jsx";
import ProductDetail from "./pages/Products/ProductDetail.jsx";
import Cart from "./pages/Cart.jsx";
import Shop from "./pages/Shop.jsx";
import ProductHistory from "./pages/Products/ProductHistory.jsx";
import Shipping from "./pages/Order/Shipping.jsx";
import Order from "./pages/Order/Order.jsx";
import OrderForm from "./pages/Order/OrderForm.jsx";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import UserOrder from "./pages/User/UserOrder.jsx";
import Orderlist from "./pages/Admin/Orderlist.jsx";
import Dashboard from "./pages/Admin/Dashboard.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route index={true} path="/" element={<Home />} />
      <Route path="/favorite" element={<Favourites />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/history" element={<ProductHistory />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/order" element={<Order />} />
        <Route path="/order/:id" element={<OrderForm />} />
        <Route path="/user-orders" element={<UserOrder />} />
      </Route>

      <Route path="/admin" element={<AdminRoute />}>
        <Route path="userlist" element={<Userlist />} />
        <Route path="categorylist" element={<Categorylist />} />
        <Route path="brandlist" element={<Brandlist />} />
        <Route path="orderlist" element={<Orderlist />} />
        <Route path="dashboard" element={<Dashboard />} />

        <Route path="productlist" element={<Productlist />} />
        <Route path="createproduct" element={<CreateProduct />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PayPalScriptProvider>
      <RouterProvider router={router} />
    </PayPalScriptProvider>
  </Provider>
);
