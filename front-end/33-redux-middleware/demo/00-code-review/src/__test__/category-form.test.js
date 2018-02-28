import React from 'react'
import { configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import CategoryForm from '../component/category/category-form/category-form';
require('jest')

configure({ adapter: new Adapter() })

describe('CategoryForm Component', function () {
  describe('Shallow Mounting for unit tests', function() {
    beforeAll(() => {
      this.wrapper = shallow(<CategoryForm />)
    })
    afterAll(() => this.wrapper.unmount())

    it('should render a CategoryForm component', () => {
      expect(this.wrapper.length).toBe(1)
      expect(this.wrapper.find('.category-form').length).toBe(1)
    })

    it('should have a default state of "title": ""', () => {
      expect(this.wrapper.state().title).toEqual('')
    })

    it('should update state when a title is provided in the form', () => {
      this.wrapper.find('.category-form input').simulate('change', { target: { name: 'title', value: 'hello world' } })
      expect(this.wrapper.state().title).toEqual('hello world')
    })
  })
  describe('Mounting Component for functional tests', function() {
    beforeAll(() => {
      let wrapper = mount(<CategoryForm />)
      wrapper.setProps({onComplete: jest.fn()})

      this.wrapper = wrapper
    })
    afterAll(() => this.wrapper.unmount())

    it('should reset the state\'s title property to an empty string on form submit', () => {
      this.wrapper.setState({title: 'hello world'})
      this.wrapper.find('.category-form').simulate('submit', {preventDefault: () => {}})
      expect(this.wrapper.state().title).toEqual('')
    })

    it('should call props.onComplete once on form submit', () => {
      expect(this.wrapper.props().onComplete).toHaveBeenCalled()
    })
  })
})
