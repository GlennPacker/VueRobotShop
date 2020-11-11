import { shallowMount, createLocalVue } from '@vue/test-utils'
import ShoppingCart from '../src/cart/ShoppingCart.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('ShoppingCart.vue', () => {
    let store, state;

    beforeEach(() => {
        state = {
            cart: [],
            saleItems: []
        }
        store = new Vuex.Store({
            modules: {
                robot: {
                    namespaced: true,
                    actions: {},
                    getters: {
                        getCart: (state) => state.cart,
                        getCartSaleItems: (state) => state.saleItems,
                    },
                    state,
                    mutations: {}
                }
            }
        })
    })

    it('basic snapshot- smoke test', () => {
        const wrapper = shallowMount(ShoppingCart, {
            store, localVue
        })

        expect(wrapper.element).toMatchSnapshot()
    })

    it('should render the cart title - smoke test', () => {
        const wrapper = shallowMount(ShoppingCart, {
            store, localVue
        })

        const title = wrapper.find('h1').text();
        expect(title).toBe('Cart')
    })


    it('should not render any robots when the cart is empty', () => {
        const wrapper = shallowMount(ShoppingCart, {
            store, localVue
        })

        expect(wrapper.findAll('.robot-title').length).toBe(2); // headings only
    })

    it('should render 1 robot when the cart has one', async () => {
        state.cart = [{ head: { title: 'head 1'}, cost: 123 }]

        const wrapper = shallowMount(ShoppingCart, {
            store, localVue
        })

        expect(wrapper.findAll('.robot-title').length).toBe(3); // 2 headings and 1 item
        expect(wrapper.findAll('.robot-title').at(1).text()).toBe('head 1');
        expect(wrapper.findAll('.cost').at(1).text()).toBe('123');
    })

    it('should render 1 robot when the sale items has 1 robot', async () => {
        state.saleItems = [{ head: { title: 'head 1'}, cost: 123 }]

        const wrapper = shallowMount(ShoppingCart, {
            store, localVue
        })

        expect(wrapper.findAll('.robot-title').length).toBe(3); // 2 headings and 1 item
        expect(wrapper.findAll('.robot-title').at(2).text()).toBe('head 1');
        expect(wrapper.findAll('.cost').at(2).text()).toBe('123');
    })
})

