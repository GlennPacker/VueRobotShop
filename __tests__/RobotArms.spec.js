import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import RobotArms from '../src/parts/RobotArms.vue'
import { partsListTestData } from '../__testData__/partsListTestData';

const localVue = createLocalVue()
localVue.use(Vuex)

describe('RobotArms.vue', () => {
    let actions
    let store, state

    beforeEach(() => {
        actions = {
            addRobot: jest.fn(),
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
        const wrapper = shallowMount(RobotArms, {
            store, localVue
        })

        await wrapper.vm.$nextTick()
        expect(state.parts).not.toBeNull();
    })

    it('dispatches loadParts when component is created', async () => {
        const wrapper = shallowMount(RobotArms, {
            store, localVue
        })

        await wrapper.vm.$nextTick()
        expect(state.parts).not.toBeNull();
    })

    it('should display the part title as the heading', async () => {
        const wrapper = shallowMount(RobotArms, {
            store, localVue
        })

        await wrapper.vm.$nextTick()
        expect(wrapper.find('h4').text()).toBe('Articulated');
    })

    it('should display the part description', async () => {
        const wrapper = shallowMount(RobotArms, {
            store, localVue
        })

        await wrapper.vm.$nextTick()
        expect(wrapper.text()).toContain('An articulated arm with a claw');
    })
})