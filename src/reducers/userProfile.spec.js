import should from        'should'  // eslint-disable-line no-unused-vars
import userProfile from   './userProfile'
import * as actions from  '../constants/ActionTypes'



describe('userProfile reducer', () => {


  it('should return the initial state', () => {

    const expectedState = {
      bio: '',
      name: '',
      profileThumbnail: ''
    }

    userProfile(undefined, {}).should.deepEqual(expectedState)

  })


  it('should handle ADD_SLIDER_IMAGES', () => {

    const expectedState = {
      bio: 'A+',
      name: 'Alpha',
      profileThumbnail: '404.jpg'
    }

    const action = {
      type    : actions.ADD_USER_PROFILE,
      payload : {
        bio: 'A+',
        name: 'Alpha',
        profileThumbnail: '404.jpg'
      }
    }

    userProfile(undefined, action).should.deepEqual(expectedState)

  })


  it('should handle ADD_USER_PROFILE', () => {

    const state = {
      bio: 'A+',
      name: 'Alpha',
      profileThumbnail: '404.jpg'
    }

    const expectedState = {
      bio: '',
      name: '',
      profileThumbnail: ''
    }

    const action = {
      type    : actions.ADD_USER_PROFILE,
      payload : {
        bio: '',
        name: '',
        profileThumbnail: ''
      }
    }

    userProfile(state, action).should.deepEqual(expectedState)

  })

})
