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
import AddItemPage from "./pages/AddItem";
import AddCategoryPage from "./pages/AddCategory";
import { useGetAllItemsQuery } from "./slices/productsApiSlice";
import { useGetAllCategoriesQuery } from "./slices/categoryApiSlice";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const {
    data: tableData = [],
    isLoading: isLoadingItems,
    error: errorItems,
    refetch: refetchItems,
  } = useGetAllItemsQuery();
  const {
    data: categories = [],
    isLoading: isLoadingCategories,
    error: errorCategories,
  } = useGetAllCategoriesQuery();
  console.log(categories);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* shop and product page */}
        <Route
          path="/shop"
          element={
            <Shop
              products={data}
              categories={categories}
              isCategory={false}
              isSearched={false}
              onOpen={onOpen}
              isOpen={isOpen}
              onClose={onClose}
              btnRef={btnRef}
            />
          }
        />
        {/* This is the correct and and better way but I can't convert code */}
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
        {categories.map((cat) => (
          <Route
            key={cat._id}
            path={"/category/" + cat.name}
            categories={categories}
            element={
              <Shop
                products={data.filter(
                  (product) => product.category === cat.name.toLowerCase()
                )}
                isCategory={true}
                isSearched={false}
                onOpen={onOpen}
                isOpen={isOpen}
                onClose={onClose}
                btnRef={btnRef}
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
          path="/dashboard/add-item"
          element={
            <ProtectedRoute>
              <AddItemPage
                onOpen={onOpen}
                isOpen={isOpen}
                onClose={onClose}
                btnRef={btnRef}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/add-category"
          element={
            <ProtectedRoute>
              <AddCategoryPage
                onOpen={onOpen}
                isOpen={isOpen}
                onClose={onClose}
                btnRef={btnRef}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/orders"
          element={
            <ProtectedRoute>
              <OrdersPage
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
