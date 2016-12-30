import should     from 'should'     // eslint-disable-line no-unused-vars
import reducer    from './index'    // eslint-disable-line no-unused-vars

import {
  getUserProfile,
  getImageGrid,
  getSlider,
  getAllImages
} from './index'



describe('selectors', () => {

  const state = {
    userProfile:{
      bio: 'yup',
      name: 'nope',
      profileThumbnail: 'pumped'
    },
    imageGrid: {
      images: [5,6,7,8]
    },
    slider:{
      images:[1,2,3,4]
    }
  }


  it('should return the getUserProfile', () => {

    const expected = {
      bio: 'yup',
      name: 'nope',
      profileThumbnail: 'pumped'
    }

    getUserProfile(state).should.deepEqual(expected)

  })


  it('should return the getImageGrid', () => {
    getImageGrid(state).should.deepEqual({images: [5,6,7,8]})
  })


  it('should return the getSlider', () => {
    getSlider(state).should.deepEqual({images: [1,2,3,4]})
  })


  it('should return the getAllImages', () => {
    getAllImages(state).should.deepEqual({ images: [1,2,3,4,5,6,7,8]})
  })

})
