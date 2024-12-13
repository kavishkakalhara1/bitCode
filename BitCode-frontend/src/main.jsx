import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store, persistor } from "./redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import ThemeProvider from "./components/ThemeProvider.jsx";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe('pk_test_51PoAoaB44XaxZNEmJa6hDXjhrpMaOjwPTOyG1pikZkG7tNOX73LOoparv94l0QelNzz36xunrhh0PUkv8H5EefkU00rgq5dkaG');

ReactDOM.createRoot(document.getElementById("root")).render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <ThemeProvider>
        <Elements stripe={stripePromise}>
          <App />
        </Elements>
      </ThemeProvider>
    </Provider>
  </PersistGate>
);
