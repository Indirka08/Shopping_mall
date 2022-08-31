import React from "react";
import ReactDOM from "react-dom/client";
import { render } from "react-dom";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "./GlobalComponents/ThemeProvider";
import { CartProvider } from "react-use-cart";
import AuthContextProvider from "./GlobalComponents/AuthContextProvider";
import ProductContextProvider from "./GlobalComponents/ProductContextProvider";

render(
  <ProductContextProvider>
    <AuthContextProvider>
      <ThemeProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </ThemeProvider>
    </AuthContextProvider>
  </ProductContextProvider>,
  document.getElementById("root")
);
