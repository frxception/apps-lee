<template lang="pug">
    v-app#login.primary
        v-content
            v-container(fluid fill-height)
                v-layout(align-center justify-center)
                    v-flex(xs12 sm8 md4 lg4)
                        v-card(flat).pa-3
                            v-card-text
                                div.layout.column.align-center
                                    h1.flex.my-4.primary--text Login
                                v-form(v-model="valid",ref="form",lazy-validation)
                                    v-text-field(v-model="login.username.value",:rules="login.username.rule",prepend-icon="person",label="用户名",type="text")
                                    v-text-field(v-model="login.password.value",:rules="login.password.rule",prepend-icon="lock",label="密码",type="password")
                            v-card-actions
                                v-spacer
                                v-btn(color="primary",:loading="loading",:disabled="!valid",@click="submit") 发射
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import gql from 'graphql-tag';
import {Action} from 'vuex-class';

const LOGIN = gql`
  query login($name: String, $password: String) {
    login(name: $name, password: $password) {
      access_token
      token_type
      expires_in
    }
  }
`;

@Component({})
    export default class Login extends Vue {
        @Action('token') public setToken: any;
        private valid: boolean = true;
        private loading: boolean = false;
        private login: any = {
            username: {
                value: '',
                rule: [(v: string) => !!v || '用户名必须填写哦!'],
            },
            password: {
                value: '',
                rule: [(v: string) => !!v || '不写密码可不是什么好孩子呢!'],
            },
        };

        private async submit(): Promise<void> {
            this.loading = true;
            if ((this.$refs.form as any).validate()) {
                try {
                    const result = await this.$apollo.query({
                        query: LOGIN,
                        variables: {
                            name: await this.login.username.value,
                            password: await this.login.password.value,
                        },
                    });
                    this.setToken(result.data.login.access_token);
                    this.$router.replace({
                        path: (this.$route.query.redirect as any)
                            ? (this.$route.query.redirect as any)
                            : '/dashboard',
                    });
                } catch (error) {
                    // 哎呀,好像出问题了
                    this.$toast(error);
                }
            }
            this.loading = false;
        }
    }
</script>
<style lang="stylus" scoped>
    #login {
        height: 50%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        content: '';
        z-index: 0;
    }
</style>
