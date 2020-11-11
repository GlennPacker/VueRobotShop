import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import RobotBuilder from '../src/build/RobotBuilder.vue'
import { partsListTestData } from '../__testData__/partsListTestData';

const localVue = createLocalVue()
localVue.use(Vuex)

describe('RobotBuilder.vue', () => {
    let actions
    let store
    let i

    beforeEach(() => {
        i = 0;
        actions = {
            addRobot: jest.fn(),
            loadParts: ({commit}) => {
                i = 10
                commit('setParts', partsListTestData)
            }
        }

        const robotModule = {
            namespaced: true,
            state: {
                cart: [],
                parts: null
            },
            mutations: {
                setParts(state, parts) {
                    state.parts = parts
                }
            },
            actions,
            getters: {
                getCart: state => state.cart,
                getParts: state => state.parts,
            }
        }

        store = new Vuex.Store({
            modules: {
                robot: robotModule
            }
        })
    })

    it('dispatches loadParts when component is created', async () => {
        const wrapper = shallowMount(RobotBuilder, {
            store, localVue
        })

        await wrapper.vm.$nextTick()
        expect(i).toBe(10);
    })

    it('should show main content when there are parts i.e the load parts api call is complete', async () => {
        const wrapper = shallowMount(RobotBuilder, {
            store, localVue
        })

        await wrapper.vm.$nextTick()
        expect(wrapper.find('.content').exists()).toBe(true)
    })

    it('should have an add to cart button', async () => {
        const wrapper = shallowMount(RobotBuilder, {
            store, localVue
        });

        await wrapper.vm.$nextTick();
        expect(wrapper.find('.add-to-cart').exists()).toBe(true);
        expect(wrapper.find('.add-to-cart').text()).toBe('Add to Cart');
    })

    it('should call the action to add the robot to cart', async () => {
        const wrapper = shallowMount(RobotBuilder, {
            store, localVue
        });

        wrapper.find('.add-to-cart').trigger('click');
        await wrapper.vm.$nextTick();
        expect(actions.addRobot).toBeCalled();
    })

    it('should set added to cart to be true after adding robot to cart', async () => {
        const wrapper = shallowMount(RobotBuilder, {
            store, localVue
        });

        // ensure the added to cart is false to start PRECONDITION
        expect(wrapper.vm.addedToCart).toBe(false);

        // Action
        wrapper.find('.add-to-cart').trigger('click');
        await wrapper.vm.$nextTick();

        // Assert
        expect(wrapper.vm.addedToCart).toBe(true);
    })
})