import { mount, shallowMount, RouterLinkStub } from '@vue/test-utils'
import HomePage from '../src/home/HomePage.vue'

test('check home page renders by looking for some hard coded text', async () => {
  // The render method returns a collection of utilities to query your component.
    const wrapper = mount(HomePage, {
        stubs: {
            RouterLink: RouterLinkStub
        }
    })

    expect(wrapper.find('.get-started').text()).toEqual('Get started building your first robot!');
})

test('find img and check src', async () => {
    // The render method returns a collection of utilities to query your component.
    const wrapper = mount(HomePage, {
        stubs: {
            RouterLink: RouterLinkStub
        }
    })

    expect(wrapper.find('.robot').attributes().src).toEqual('../assets/robot-home.png');
})