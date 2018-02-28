import reducer from '../reducer/category'

describe('category reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([])
  })

  it('should handle CATEGORY_CREATE', () => {
    let categoryOne = { _id: '1234', title: 'this is a title', timestamp: new Date()}
    let categoryTwo = { _id: '456', title: 'this is a title', timestamp: new Date() }
    // console.log(reducer([categoryOne], {
    //   type: 'CATEGORY_CREATE',
    //   payload: categoryTwo
    // }))
    let state = reducer([categoryOne], {
      type: 'CATEGORY_CREATE',
      payload: categoryTwo
    })

    expect(state).toContain(categoryOne)
    expect(state).toContain(categoryTwo)
  })
})
