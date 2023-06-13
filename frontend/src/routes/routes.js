import ProtectedRoute from "./Auth.route";
import {
  LoginPage,
  SignupPage,
  VerificationPage,
  HomePage,
  ProductsPage,
  BestSellingPage,
  ProductDetailsPage,
  ProfilePage,
  CheckoutPage,
  SuccessPage,
} from "../Routes.js";

export const routes = [
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/sign-up", element: <SignupPage /> },
  { path: "/verification/:token", element: <VerificationPage /> },
  { path: "/products", element: <ProductsPage /> },
  { path: "/product/:id", element: <ProductDetailsPage /> },
  { path: "/best-selling", element: <BestSellingPage /> },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/checkout",
    element: (
      <ProtectedRoute>
        <CheckoutPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/success",
    element: (
      <ProtectedRoute>
        <SuccessPage />
      </ProtectedRoute>
    ),
  },
];
