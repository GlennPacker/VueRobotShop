import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import PartInfo from '../src/parts/PartInfo.vue';

const localVue = createLocalVue()
localVue.use(Vuex)

describe('part info component (PartInfo.vue)', () => {
    let store;
    let state = {
        parts: {
            heads: [{
                id: 1,
                title: 'smiley',
                description: 'description'
            }]
        }
    };

    beforeEach(() => {
        store = new Vuex.Store({
            modules: {
                robot: {
                    actions: {
                        loadParts: () => {}
                    },
                    getters: {
                        getParts: state => state.parts
                    },
                    mutations: {},
                    namespaced: true,
                    state
                }
            }
        })
    })

    it('should render the part', async () => {
        const wrapper = shallowMount(PartInfo, {
            propsData: {
                partType: 'heads',
                id: 1
            },
            store, localVue
        })

        await wrapper.vm.$nextTick();
        expect(wrapper.find('h1').exists()).toBe(true);
        expect(wrapper.find('h1').text()).toBe(state.parts.heads[0].title);
        expect(wrapper.find('.description').text()).toBe(state.parts.heads[0].description);
    })
})