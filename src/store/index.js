import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        cart: []
    },
    mutations: {
        addRobotToCart(state, robot) {
            state.cart.push(robot);
        }
    },
    actions: {
        addRobot({commit}, robot) {
            return commit('addRobotToCart', robot);
        }
    },
    getters: {
        getCart: (state) => state.cart,
        hasItemsInCart: state => !!state.cart.length,
        itemsInCart: state => state.cart.length,
        getCartSaleItems: state => state.cart.filter(i => i.head.onSale)
    },
})
