declare module 'twemoji'
declare module 'v-charts';
declare module 'nprogress';
declare module 'vue-cli-plugin-apollo/graphql-client';
declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}
declare module '*.gql' {
  const content: any;
  export default content;
}
declare module '*.graphql' {
  const content: any;
  export default content;
}
