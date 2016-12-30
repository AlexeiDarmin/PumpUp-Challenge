import should from        'should'  // eslint-disable-line no-unused-vars
import slider from         './slider'
import * as actions from  '../constants/ActionTypes'



describe('slider reducer', () => {


  it('should return the initial state', () => {
    slider(undefined, {}).should.deepEqual({images:[]})
  })


  it('should handle ADD_SLIDER_IMAGES', () => {

    const action = {
      type    : actions.ADD_SLIDER_IMAGES,
      payload : [1,2,4,8,16]
    }

    slider(undefined, action).should.deepEqual({ images: [1,2,4,8,16]})

  })


  it('should handle ADD_SLIDER_IMAGES', () => {

    const action = {
      type    : actions.ADD_SLIDER_IMAGES,
      payload : []
    }

    slider({ images: [1,2,4,8,16]}, action).should.deepEqual({ images: []})

  })

})
