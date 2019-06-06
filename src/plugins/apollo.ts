import Vue from 'vue'
import VueApollo from 'vue-apollo'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createApolloClient } from 'vue-cli-plugin-apollo/graphql-client'
import router from '@/router'

Vue.use(VueApollo)

const AUTH_TOKEN = 'token'

const httpEndpoint =
    process.env.VUE_APP_GRAPHQL_HTTP || 'http://localhost:4000/graphql'

// Config
const defaultOptions = {
    httpEndpoint,
    tokenName: AUTH_TOKEN,
    persisting: false,
    websocketsOnly: false,
    ssr: false,
    cache: new InMemoryCache()
}

export function createProvider(options = {}) {
    const { apolloClient } = createApolloClient({
        ...defaultOptions,
        ...options
    })

    const apolloProvider = new VueApollo({
        defaultClient: apolloClient,
        defaultOptions: {
            $query: {
                fetchPolicy: 'cache-and-network'
            }
        },
        errorHandler(error) {
            // tslint:disable-next-line:no-console
            console.log(
                '%cError',
                'background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;',
                JSON.stringify(error.graphQLErrors[0].message)
            )
            if (error.graphQLErrors[0].message.statusCode === 401) {
                router.replace({
                    path: '/login',
                    query: {
                        redirect: router.currentRoute.fullPath
                    }
                })
            }
        }
    })

    return apolloProvider
}
