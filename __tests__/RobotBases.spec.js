import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import RobotBases from '../src/parts/RobotBases.vue'
import { partsListTestData } from '../__testData__/partsListTestData';

const localVue = createLocalVue()
localVue.use(Vuex)

describe('RobotBases.vue', () => {
    let actions
    let store, state

    beforeEach(() => {
        actions = {
            loadParts: ({commit}) => {
                commit('setParts', partsListTestData)
            }
        }

        state = {
            parts: null
        };

        const robotModule = {
            namespaced: true,
            state,
            mutations: {
                setParts(state, parts) {
                    state.parts = parts
                }
            },
            actions,
            getters: {
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
        const wrapper = shallowMount(RobotBases, {
            store, localVue
        })

        await wrapper.vm.$nextTick()
        expect(state.parts).not.toBeNull();
    })

    it('dispatches loadParts when component is created', async () => {
        const wrapper = shallowMount(RobotBases, {
            store, localVue
        })

        await wrapper.vm.$nextTick()
        expect(state.parts).not.toBeNull();
    })

    it('should display the part title as the heading', async () => {
        const wrapper = shallowMount(RobotBases, {
            store, localVue
        })

        await wrapper.vm.$nextTick()
        expect(wrapper.find('h4').text()).toBe('Double Wheeled');
    })

    it('should display the part description', async () => {
        const wrapper = shallowMount(RobotBases, {
            store, localVue
        })

        await wrapper.vm.$nextTick()
        expect(wrapper.text()).toContain('A two wheeled base with an accelerometer for st');
    })
})