import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ReactNode } from "react";
import useAuth from "../hooks/useAuth";

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_HASURA_ENDPOINT,
  credentials: "same-origin",
});

const authLink = (authToken: String) => {
  return setContext((_, { headers }) => {
    if (!authToken) return headers;
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${authToken}`,
      },
    };
  });
};

const createApolloClient = (authToken: String) => {
  return new ApolloClient({
    link: authLink(authToken).concat(httpLink),
    cache: new InMemoryCache(),
  });
};

const CustomApolloProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const client = createApolloClient(user.token);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default CustomApolloProvider;
