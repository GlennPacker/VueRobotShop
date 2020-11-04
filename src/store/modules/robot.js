import axios from 'axios'

export default {
    namespaced: true,
    state: {
        cart: [],
        parts: null,
        error: null
    },
    mutations: {
        addRobotToCart(state, robot) {
            state.cart.push(robot);
        },
        setError(state, error) {
            state.error = error
        },
        setParts(state, parts) {
            state.parts = parts
        }
    },
    actions: {
        addRobot({ commit, state }, robot) {
            const cart = [ ...state.cart, robot];
            return axios.post('./api/cart', cart).then(() => {
                commit('addRobotToCart', robot)
            });
        },
        loadParts({commit}) {
            return axios
                .get('/api/parts')
                .then(res =>
                    commit('setParts', res.data)
                )
                .catch(() =>
                    commit('setError', 'Ooops somthing went bang')
                )
        }
    },
    getters: {
        getCart: state => state.cart,
        hasItemsInCart: state => !!state.cart.length,
        itemsInCart: state => state.cart.length,
        getCartSaleItems: state => state.cart.filter(i => i.head.onSale),
        getError: state => state.error,
        getParts: state => state.parts,
    }
};