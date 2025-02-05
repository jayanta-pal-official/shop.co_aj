import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import {
  CartPage,
  DeclinedPage,
  Login,
  OrdersPage,
  ProfilePage,
  Register,
  SuccessPage,
  OrdersItemPage,
  CartAddress,
  LoaderScreen,
} from "./pages/page";
import { HomePage } from "./pages/page";
import {
  Product,
  CategoryProduct,
  ProductsBySlug,
  Loader,
} from "./components/component";
import {
  AddCategory,
  AddProduct,
  AddUser,
  AllCategory,
  AllOrders,
  AllProducts,
  AllUsers,
  Dashbroad,
  ProductDetails,
  ViewOrder,
  ViewUser,
  CategoryProducts,
  AddSubCategory,
  SubCategoryProducts,
} from "./pages/adminPages/adminPages";

// lazy loadings
const HomeLayout = lazy(() => import("./layouts/Home"));
const ProductLayout = lazy(() => import("./layouts/Product"));
const AuthLayout = lazy(() => import("./layouts/Auth"));
const UserLayout = lazy(() => import("./layouts/User"));
const AdminLayout = lazy(() => import("./layouts/Admin"));
const ErrorLayout = lazy(() => import("./layouts/Error"));
// funcs
function SuspenseLayout() {
  return (
    <>
      <Suspense fallback={<LoaderScreen />}>
        <Outlet />
      </Suspense>
    </>
  );
}
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<SuspenseLayout />} errorElement={<ErrorLayout />}>
      <Route path="/" element={<HomeLayout />}>
        <Route index element={<HomePage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="cart/order" element={<CartAddress />} />
      </Route>
      <Route path="/user" element={<UserLayout />}>
        <Route index element={<ProfilePage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="orders/:id" element={<OrdersItemPage />} />
      </Route>

      <Route path="/auth" element={<AuthLayout />}>
        <Route index element={<Login />} />
        <Route path="signup" element={<Register />} />
      </Route>
      <Route path="/product" element={<ProductLayout />}>
        <Route path=":id" element={<Product />} />
        <Route path="category/:id?" element={<CategoryProduct />} />
        <Route path="slug" element={<ProductsBySlug />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashbroad />} />
        <Route path="products" element={<AllProducts />} />
        <Route path="products/add" element={<AddProduct />} />
        <Route path="products/:id" element={<ProductDetails />} />
        <Route path="orders" element={<AllOrders />} />
        <Route path="orders/:id" element={<ViewOrder />} />
        <Route path="users" element={<AllUsers />} />
        <Route path="users/add" element={<AddUser />} />
        <Route path="users/:id" element={<ViewUser />} />
        <Route path="category" element={<AllCategory />} />
        <Route path="category/add" element={<AddCategory />} />
        <Route path="category/:id" element={<CategoryProducts />} />
        <Route path="subcategory/add" element={<AddSubCategory />} />
        <Route path="subcategory/:id" element={<SubCategoryProducts />} />
      </Route>
      <Route path="/success" element={<SuccessPage />} />
      <Route path="/declined" element={<DeclinedPage />} />
      <Route path="/*" element={<ErrorLayout />} />
    </Route>
  )
);

function App() {
  return (
    <Suspense fallback={<LoaderScreen />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
