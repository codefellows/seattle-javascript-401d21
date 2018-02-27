import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import {configure, shallow, mount} from 'enzyme'
import CategoryForm from '../component/category/category-form/category-form'
require('jest')

configure({adapter: new Adapter()})

describe('<CategoryForm />', function() {
  describe('Shallow Mounting', function() {
    beforeAll(() => {
      let wrapper = shallow(<CategoryForm />)

      this.wrapper = wrapper
    })
    afterAll(() => this.wrapper.unmount())

    it('should render a category form component', () => {
      console.log(this.wrapper.html())
      expect(this.wrapper.length).toBe(1)
      expect(this.wrapper.find('.category-form').length).toBe(1)
    })

    it('should have a default state object with a title property assigned an empty string', () => {
      expect(this.wrapper.state().title).toEqual('')
    })

    it('should change the state object when form input is provided', () => {
      let event = {target: { name: 'title', value: 'hello' }}
      this.wrapper.find('.category-form input').simulate('change', event)
      expect(this.wrapper.state().title).toEqual('hello')

      // wrapper.instance().handleChange(event)
    })
  })

  describe('Full Mounting', function() {
    beforeAll(() => {
      this.wrapper = mount(<CategoryForm />)
      this.wrapper.setProps({onComplete: jest.fn()})
    })
    afterAll(() => this.wrapper.unmount())

    it('should reset the state.title value to empty string on form submit', () => {
      this.wrapper.setState({title: 'goodbye world'})
      expect(this.wrapper.state().title).toEqual('goodbye world')
      this.wrapper.simulate('submit', {preventDefault: () => {}})
      expect(this.wrapper.state().title).toEqual('')
    })

    it('should have called onComplete in the previous assertion', () => {
      expect(this.wrapper.props().onComplete).toHaveBeenCalled()
    })
  })
})
