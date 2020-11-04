import Vue from 'vue'
import Vuex from 'vuex'

import robotsModule from './modules/robot';
import userModule from './modules/users';

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        robot: robotsModule,
        user: userModule
    }
})
