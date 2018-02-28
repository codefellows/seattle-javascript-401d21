import React from 'react'
import {configure, shallow, mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {Provider} from 'react-redux'
import createStore from '../lib/store'
import Dashboard from '../component/dashboard/dashboard'
require('jest')

configure({adapter: new Adapter()})

describe('Dashboard Component', function() {
  beforeAll(() => {
    this.wrapper = mount(<Provider store={createStore()}><Dashboard /></Provider>)
    this.wrapper.setProps({ categories: [{ _id: '1234', title: 'who', timestamp: new Date() }, { _id: '5678', title: 'what', timestamp: new Date() }]})
  })
  afterAll(() => this.wrapper.unmount())

  it('should render the Dashboard component', () => {
    expect(this.wrapper.find('.dashboard').length).toBe(1)
    expect(this.wrapper.find('CategoryForm')).toBeTruthy()
  })

  it('should render the CategoryForm component', () => {
    expect(this.wrapper.find('CategoryForm').length).toBe(1)
  })

  // it('should render two category items as Divs in the document', () => {
  //   expect(this.wrapper.find('.category-items').length).toBe(2)
  // })
})
