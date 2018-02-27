import * as actions from '../action/category-actions'
require('jest')

describe('category actions', () => {
  it('should create an action to add a category', () => {
    let category = {title: 'hello world'}
    let action = actions.categoryCreate(category)

    expect(action.type).toEqual('CATEGORY_CREATE')
    expect(action.payload).toHaveProperty('_id')
    expect(action.payload).toHaveProperty('timestamp')
  })
})
