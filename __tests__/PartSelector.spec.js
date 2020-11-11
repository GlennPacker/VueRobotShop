import { mount, RouterLinkStub } from '@vue/test-utils'
import PartSelector from '../src/build/PartSelector.vue'

describe('Part Selector Component', () => {
    test('smoke test - check component renders by looking for some the sale text', async () => {
        // The render method returns a collection of utilities to query your component.
        const wrapper = mount(PartSelector, {
            propsData: {
                parts: [
                    { onSale: true, src: 'src', id: 1, type: 'a'},
                    { onSale: false, src: 'src2', id: 2, type: 'a'}
                ],
                position: 'left'
            },
            stubs: {
                RouterLink: RouterLinkStub
            }
        })

        expect(wrapper.find('.sale').text()).toEqual('Sale!');
    })

    test('renders the image using the url given', async () => {
        // The render method returns a collection of utilities to query your component.
        const wrapper = mount(PartSelector, {
            propsData: {
                parts: [
                    { onSale: true, src: 'src', id: 1, type: 'a'},
                    { onSale: false, src: 'src2', id: 2, type: 'a'}
                ],
                position: 'left'
            },
            stubs: {
                RouterLink: RouterLinkStub
            }
        })

        expect(wrapper.find('img').attributes().src).toEqual('src');
    })

    test('emits the first item in the list as the selected Item', async () => {
        // The render method returns a collection of utilities to query your component.
        const wrapper = mount(PartSelector, {
            propsData: {
                parts: [
                    { onSale: true, src: 'src', id: 1, type: 'a'},
                    { onSale: false, src: 'src2', id: 2, type: 'a'},
                    { onSale: false, src: 'src3', id: 3, type: 'a'}
                ],
                position: 'left'
            },
            stubs: {
                RouterLink: RouterLinkStub
            }
        })

        await wrapper.vm.$nextTick()
        expect(wrapper.emitted().partSelected).toBeTruthy();
        expect(wrapper.emitted().partSelected[0][0].id).toBe(1);
    })

    test('clicking next shows the next part', async () => {
        // The render method returns a collection of utilities to query your component.
        const wrapper = mount(PartSelector, {
            propsData: {
                parts: [
                    { onSale: true, src: 'src', id: 1, type: 'a'},
                    { onSale: false, src: 'src2', id: 2, type: 'a'},
                    { onSale: false, src: 'src3', id: 3, type: 'a'}
                ],
                position: 'left'
            },
            stubs: {
                RouterLink: RouterLinkStub
            }
        })

        // initial state is what we expect
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.selectedPartIndex).toBe(0);
        expect(wrapper.vm.selectedPart.id).toBe(1);

        wrapper.find('.next-selector').trigger('click');
        await wrapper.vm.$nextTick()

        // next item is selected
        expect(wrapper.vm.selectedPart.id).toBe(2);
        expect(wrapper.vm.selectedPartIndex).toBe(1);
    })

    test('clicking previous button when at the initial state should show the last part', async () => {
        // The render method returns a collection of utilities to query your component.
        const wrapper = mount(PartSelector, {
            propsData: {
                parts: [
                    { onSale: true, src: 'src', id: 1, type: 'a'},
                    { onSale: false, src: 'src2', id: 2, type: 'a'},
                    { onSale: false, src: 'src3', id: 3, type: 'a'}
                ],
                position: 'left'
            },
            stubs: {
                RouterLink: RouterLinkStub
            }
        })

        // initial state is what we expect
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.selectedPartIndex).toBe(0);
        expect(wrapper.vm.selectedPart.id).toBe(1);

        wrapper.find('.prev-selector').trigger('click');
        await wrapper.vm.$nextTick()

        // next item is selected
        expect(wrapper.vm.selectedPart.id).toBe(3);
        expect(wrapper.vm.selectedPartIndex).toBe(2);
        expect(wrapper.find('img').attributes().src).toEqual('src3');
    })

    test('clicking previous button when not the initial state should show the previous part', async () => {
        // The render method returns a collection of utilities to query your component.
        const wrapper = mount(PartSelector, {
            propsData: {
                parts: [
                    { onSale: true, src: 'src', id: 1, type: 'a'},
                    { onSale: false, src: 'src2', id: 2, type: 'a'},
                    { onSale: false, src: 'src3', id: 3, type: 'a'}
                ],
                position: 'left'
            },
            stubs: {
                RouterLink: RouterLinkStub
            }
        })

        // initial state is what we expect
        await wrapper.vm.$nextTick()
        wrapper.find('.prev-selector').trigger('click');
        expect(wrapper.vm.selectedPart.id).toBe(3);
        expect(wrapper.vm.selectedPartIndex).toBe(2);

        wrapper.find('.prev-selector').trigger('click');
        await wrapper.vm.$nextTick()

        // next item is selected
        expect(wrapper.vm.selectedPart.id).toBe(2);
        expect(wrapper.vm.selectedPartIndex).toBe(1);
        expect(wrapper.find('img').attributes().src).toEqual('src2');
    })


    test('clicking next button when the last item in the list is selected should show the first part', async () => {
        // The render method returns a collection of utilities to query your component.
        const wrapper = mount(PartSelector, {
            propsData: {
                parts: [
                    { onSale: true, src: 'src', id: 1, type: 'a'},
                    { onSale: false, src: 'src2', id: 2, type: 'a'},
                    { onSale: false, src: 'src3', id: 3, type: 'a'}
                ],
                position: 'left'
            },
            stubs: {
                RouterLink: RouterLinkStub
            }
        })

        // initial state is what we expect
        await wrapper.vm.$nextTick()
        wrapper.find('.prev-selector').trigger('click');
        expect(wrapper.vm.selectedPart.id).toBe(3);
        expect(wrapper.vm.selectedPartIndex).toBe(2);

        wrapper.find('.next-selector').trigger('click');
        await wrapper.vm.$nextTick()

        // next item is selected
        expect(wrapper.vm.selectedPart.id).toBe(1);
        expect(wrapper.vm.selectedPartIndex).toBe(0);
        expect(wrapper.find('img').attributes().src).toEqual('src');
    })
})
