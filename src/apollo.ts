import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import Vue from 'vue';
import VueApollo from 'vue-apollo';
import router from './router';
import store from './store';

Vue.use(VueApollo);

const authMiddleware = new ApolloLink((operation, forward) => {
  if (!forward) {
    return null;
  }
  operation.setContext({
    headers: {
      Authorization: `bearer ${store.state.token}`,
    },
  });
  return forward(operation);
});

const httpLink = new HttpLink({
  uri: 'http://172.17.3.68:3000/api/graphql',
  // uri: 'http://localhost:3000/api/graphql',
});

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  // if (graphQLErrors) {
  //     for (const err of graphQLErrors) {
  //         if (err.message.statusCode === 401 || err.message.statusCode === 403) {
  //             store.dispatch('RM_TOKEN');
  //             router.replace({
  //                 path: '/login',
  //                 query: {
  //                     redirect: router.currentRoute.fullPath,
  //                 },
  //             });
  //         }
  //     }
  // }
  // console.log(
  //   '%cError',
  //   'background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;',
  //   `Message: [Network error]: ${JSON.stringify(networkError)}`,
  // );
  // console.log(
  //   '%cError',
  //   'background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;',
  //   `Message: [GraphQL error]: ${JSON.stringify(graphQLErrors)}`,
  // );
});

const apolloClient = new ApolloClient({
  link: ApolloLink.from([authMiddleware, errorLink, httpLink]),
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

export const createProvider = () =>
  new VueApollo({
    defaultClient: apolloClient,
    defaultOptions: {
      $loadingKey: 'loading',
      $query: {
        loadingKey: 'loading',
        fetchPolicy: 'cache-and-network',
      },
    },
  });
