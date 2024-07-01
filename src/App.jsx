import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Home } from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import { ProfilePage } from "./pages/ProfilePage";
import Dashboard from "./pages/Dashboard";
import UserPage from "./pages/UserPage";
import { useDisclosure } from "@chakra-ui/react";
import OrdersPage from "./pages/OrdersPage";
import data, { categories } from "./products";
import Shop from "./pages/Shop";
import Product from "./pages/Product";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* shop and product page */}
        <Route
          path="/shop"
          element={
            <Shop
              onOpen={onOpen}
              products={data}
              isCategory={false}
              isSearched={false}
              isOpen={isOpen}
              onClose={onClose}
              btnRef={btnRef}
            />
          }
        />
        {data.map((product) => (
          <Route
            key={product.id}
            path={"/product/" + product.id}
            element={
              <Product
                product={product}
                onOpen={onOpen}
                isOpen={isOpen}
                onClose={onClose}
                btnRef={btnRef}
              />
            }
          />
        ))}
        {categories.map((category) => (
          <Route
            key={category}
            path={"/category/" + category}
            element={
              <Shop
                products={data.filter(
                  (product) => product.category === category
                )}
                isCategory={true}
                isSearched={false}
              />
            }
          />
        ))}

        {/* Private Routes Here */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard
                onOpen={onOpen}
                isOpen={isOpen}
                onClose={onClose}
                btnRef={btnRef}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/userpage"
          element={
            <ProtectedRoute>
              <UserPage
                onOpen={onOpen}
                isOpen={isOpen}
                onClose={onClose}
                btnRef={btnRef}
              />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
