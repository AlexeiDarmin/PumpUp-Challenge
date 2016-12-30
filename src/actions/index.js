import * as types         from '../constants/ActionTypes'
import { requests }       from '../constants/Api'
import { handleRequest }  from '../utils/index'



export const fetchUserFeedPhotos = () => (dispatch) => {

  return handleRequest(requests.userPhotosFeed)
  .then((result) => {

    const payload = result.result.posts.map((post) => post.thumbnail)
    dispatch({ type: types.ADD_SLIDER_IMAGES, payload })
  })

}


export const fetchPopularFeedPhotos = () => (dispatch) => {

  return handleRequest(requests.popularPhotosFeed)
  .then((result) => {

    const payload = result.result.posts.map((post) => post.thumbnail)
    dispatch({ type: types.ADD_GRID_IMAGES, payload })
  })

}


export const fetchUserProfile = () => (dispatch) => {
  return handleRequest(requests.loadUserProfile)
  .then((result) => dispatch({ type: types.ADD_USER_PROFILE, payload: result }))
}
