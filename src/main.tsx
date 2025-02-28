import { ApolloProvider } from "@apollo/client";
import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { apolloClient } from "./lib/apolloClient";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
);
