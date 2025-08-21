import { StrictMode } from "react";

import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { BrowserRouter } from "react-router";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.tsx";

import UserBootstrapper from "./components/userfetcher.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <UserBootstrapper>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserBootstrapper>
    </Provider>
  </StrictMode>
);
