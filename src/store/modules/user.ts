import {
    VuexModule,
    Module,
    MutationAction,
    Mutation,
    Action,
    getModule
} from 'vuex-module-decorators'
import store from '@/store'

export interface IUserState {
    token: string
    name: string
    avatar: string
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
    public token = ''
    public name = ''
    public avatar = ''
}

export const UserModule = getModule(User)
