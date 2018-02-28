import * as actions from '../action/category-actions'
import CategoryForm from '../component/category/category-form/category-form';

describe('actions', () => {
  it('should create an action to add a category', () => {
    let category = { title: 'this is a title' }

    const expectedAction = {
      type: 'CATEGORY_CREATE',
      payload: category
    }

    let action = actions.categoryCreate(category)

    expect(action.type).toEqual('CATEGORY_CREATE')
    expect(action.payload).toHaveProperty('_id')
    expect(action.payload).toHaveProperty('timestamp')
  })
})
