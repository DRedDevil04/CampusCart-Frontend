import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDisclosure, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import ProtectedRoute from "./components/ProtectedRoute";
import PrivateRoute from "./components/PrivateRoute";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import ProfilePage from "./pages/ProfilePage";
import Dashboard from "./pages/Dashboard";
import UserPage from "./pages/UserPage";
import OrdersPage from "./pages/OrdersPage";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import AddItemPage from "./pages/AddItem";
import AddCategoryPage from "./pages/AddCategory";
import CartPage from "./pages/CartPage";
import { useGetAllItemsQuery } from "./slices/productsApiSlice";
import { useGetAllCategoriesQuery } from "./slices/categoryApiSlice";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  // Fetching items
  const {
    data: itemsData,
    isLoading: isLoadingItems,
    error: errorItems,
    refetch: refetchItems,
  } = useGetAllItemsQuery();
  
  // Fetching categories
  const {
    data: categoriesData,
    isLoading: isLoadingCategories,
    error: errorCategories,
  } = useGetAllCategoriesQuery();

  if (isLoadingItems || isLoadingCategories) {
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
        mt="20%"
      />
    );
  }

  if (errorItems || errorCategories) {
    return (
      <Alert status="error">
        <AlertIcon />
        Error loading data. Please try again later.
      </Alert>
    );
  }

  const products = itemsData || [];
  const categories = categoriesData || [];
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/cart"
          element={
            <CartPage
              onOpen={onOpen}
              isOpen={isOpen}
              onClose={onClose}
              btnRef={btnRef}
            />
          }
        />
        {/* Shop and Product Pages */}
        <Route
          path="/"
          element={
            <Shop
              products={products}
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
        {products.map((product) => (
          <Route
            key={product._id}
            path={"/product/" + product._id}
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
            element={
              <Shop
                products={products.filter(
                  (product) =>
                    product.category.name.toLowerCase() === cat.name.toLowerCase()
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

        {/* Private Routes */}
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route
            path="/dashboard"
            element={
              <Dashboard
                onOpen={onOpen}
                isOpen={isOpen}
                onClose={onClose}
                btnRef={btnRef}
              />
            }
          />
          <Route
            path="/dashboard/add-item"
            element={
              <AddItemPage
                onOpen={onOpen}
                isOpen={isOpen}
                onClose={onClose}
                btnRef={btnRef}
              />
            }
          />

          <Route
            path="/dashboard/add-category"
            element={
              <AddCategoryPage
                onOpen={onOpen}
                isOpen={isOpen}
                onClose={onClose}
                btnRef={btnRef}
              />
            }
          />
          <Route
            path="/dashboard/orders"
            element={
              <OrdersPage
                onOpen={onOpen}
                isOpen={isOpen}
                onClose={onClose}
                btnRef={btnRef}
              />
            }
          />
          <Route
            path="/dashboard/userpage"
            element={
              <UserPage
                onOpen={onOpen}
                isOpen={isOpen}
                onClose={onClose}
                btnRef={btnRef}
              />
            }
          />
        </Route>

        <Route path="/" element={<ProtectedRoute />}>
          <Route
            path="/profile"
            element={
              <ProfilePage
                onOpen={onOpen}
                isOpen={isOpen}
                onClose={onClose}
                btnRef={btnRef}
              />
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
