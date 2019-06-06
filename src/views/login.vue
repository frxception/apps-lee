<template>
  <v-app
    class="primary"
    id="login"
  >
    <v-content>
      <v-container
        fluid
        fill-height
      >
        <v-layout
          align-center
          justify-center
        >
          <v-flex
            xs12
            sm6
            md4
            lg3
          >
            <v-card flat>
              <v-card-text>
                <div class="layout column align-center">
                  <h1 class="flex my-4 primary--text">登录 BLOG</h1>
                </div>
                <v-form
                  v-model="valid"
                  ref="form"
                  lazy-validation="lazy-validation"
                >
                  <v-text-field
                    v-model="login.username.value"
                    :rules="login.username.rule"
                    prepend-icon="person"
                    label="用户名"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    v-model="login.password.value"
                    :rules="login.password.rule"
                    prepend-icon="lock"
                    label="密码"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  :loading="loading"
                  :disabled="!valid"
                  @click="submit"
                >登录</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import gql from 'graphql-tag'
import { Action } from 'vuex-class'
const LOGIN = gql`
    query login($name: String, $password: String) {
        login(name: $name, password: $password) {
            access_token
            token_type
            expires_in
        }
    }
`
@Component({})
export default class Login extends Vue {
    @Action public SET_TOKEN: any
    private valid: boolean = true
    private loading: boolean = false
    private login: any = {
        username: {
            value: '',
            rule: [(v: string) => !!v || '用户名必须填写哦!']
        },
        password: {
            value: '',
            rule: [(v: string) => !!v || '不写密码真的好吗?']
        }
    }
    private async submit(): Promise<void> {
        this.loading = true
        if ((this.$refs.form as any).validate()) {
            try {
                const result = await this.$apollo.query({
                    query: LOGIN,
                    variables: {
                        name: await this.login.username.value,
                        password: await this.login.password.value
                    }
                })
                this.SET_TOKEN(result.data.login.access_token)
                this.$router.push({
                    path: (this.$route.query.redirect as any) || '/'
                })
            } catch (error) {
                this.$message(`${error.graphQLErrors[0].message}`, {
                    icon: 'message'
                })
            }
        }
        this.loading = false
    }
}
</script>
