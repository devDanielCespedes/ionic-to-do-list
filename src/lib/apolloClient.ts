import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { loadDevMessages, loadErrorMessages } from "@apollo/client/dev";

// Habilita mensagens de erro detalhadas no ambiente de desenvolvimento
if (import.meta.env.NODE_ENV !== "production") {
  loadDevMessages();
  loadErrorMessages();
}

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
