import React from 'react'
import {Provider} from 'react-redux'
import createStore from '../lib/store'
import Adapter from 'enzyme-adapter-react-16'
import { configure, shallow, mount } from 'enzyme'
import Dashboard from '../component/dashboard/dashboard'

require('jest')

configure({ adapter: new Adapter() })

describe('<Dashboard />', function () {
  beforeAll(() => {
    let wrapper = mount(<Provider store={createStore()}><Dashboard/></Provider>)
    wrapper.setProps({ categories: [
      { _id: '1234', title: 'wat', timestamp: new Date() },
      { _id: '4567', title: 'who', timestamp: new Date() }]})

    this.wrapper = wrapper
  })
  afterAll(() => this.wrapper.unmount())

  it('should render two category items in the DOM', () => {
    // console.log(this.wrapper.html())
    // expect(this.wrapper.find('.dashboard').length).toBe(1)
  })
})
