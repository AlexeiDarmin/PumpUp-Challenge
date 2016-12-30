import should from        'should'  // eslint-disable-line no-unused-vars
import imageGrid from     './imageGrid'
import * as actions from  '../constants/ActionTypes'



describe('imageGrid reducer', () => {


  it('should return the initial state', () => {
    imageGrid(undefined, {}).should.deepEqual({images:[]})
  })


  it('should handle ADD_GRID_IMAGES', () => {

    const action = {
      type    : actions.ADD_GRID_IMAGES,
      payload : [1,2,4,8,16]
    }

    imageGrid(undefined, action).should.deepEqual({ images : [1,2,4,8,16] })

  })


  it('should handle ADD_GRID_IMAGES', () => {

    const action = {
      type    : actions.ADD_GRID_IMAGES,
      payload : []
    }

    imageGrid({ images : [1,2,4,8,16] }, action).should.deepEqual({ images: []})

  })

})
