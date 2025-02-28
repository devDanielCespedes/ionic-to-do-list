import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { loadDevMessages, loadErrorMessages } from "@apollo/client/dev";

// Habilita mensagens de erro detalhadas no ambiente de desenvolvimento
if (import.meta.env.NODE_ENV !== "production") {
  loadDevMessages();
  loadErrorMessages();
}

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/graphql",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
