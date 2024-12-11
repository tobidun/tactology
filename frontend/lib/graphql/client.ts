import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { GRAPHQL_ENDPOINT } from "../constants";

// Create an HTTP link to your GraphQL endpoint
const httpLink = new HttpLink({
  uri: GRAPHQL_ENDPOINT,
  credentials: "same-origin", // or 'include' if you need cookies
});

// Set up context to add the Authorization header
const authLink = setContext((_, { headers }) => {
  // Get the token from localStorage (or other storage mechanism)
  const token = localStorage.getItem("authToken"); // Replace with your token storage method

  // Return the headers with the Authorization token
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "", // Only set the token if it exists
    },
  };
});

// Create Apollo Client and concatenate the authLink and httpLink
export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
