import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import App from "./App";
import "./index.css";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PassengersList from "./pages/PassengersList";
import PassengerDetail from "./pages/PassengerDetail";
import FlaggedPassengers from "./pages/FlaggedPassengers";
import AnalyticsPage from "./pages/AnalyticsPage";
import SendAlertsPage from "./pages/SendAlertsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/passengers" element={<PassengersList />} />
              <Route path="/passengers/:id" element={<PassengerDetail />} />
              <Route path="/flagged" element={<FlaggedPassengers />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/alerts" element={<SendAlertsPage />} />
            </Route>
            <Route
              path="*"
              element={
                <p className="text-center text-red-600">404 ‑ Not Found</p>
              }
            />
          </Routes>
        </BrowserRouter>

        {/* Devtools—you can remove in production */}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
