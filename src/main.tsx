import { BrowserRouter } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@/styles/index.css";

import AppRoutes from "@/components/routes/AppRoutes";
import Fallback from "@/components/Fallback";
import { Toaster } from "@/components/ui/sonner";

import { Provider } from "react-redux";
import { persistor, store } from "@/redux/store";
import { ErrorBoundary } from "react-error-boundary";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary FallbackComponent={Fallback}>
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <StrictMode>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
          <Toaster />
        </StrictMode>
      </PersistGate>
    </Provider>
  </ErrorBoundary>,
);
