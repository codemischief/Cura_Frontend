import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./context/AuthProvider.jsx";
import { Provider } from "react-redux";
import { store } from "./Redux/store.js";
import { AuthProvider } from "./context/JwtContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      {/* <AuthProvider> */}
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
        <ToastContainer autoClose={3000} />
      </AuthProvider>
    </Provider>
  </BrowserRouter>
);
