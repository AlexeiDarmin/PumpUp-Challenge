import * as types from '../constants/ActionTypes'

const requestBodies = {
  getUserProfile : {
    "_method": "GET",
    "_version": "4.7.0",
    "_SessionToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOjI3MDc3OTgsImV4cCI6MTUzOTUzNTI1OTM2OH0.UK2qP1yk9QLk_Bkx1Ly0RPaitRYtec8ojZhzYRc0D-g"
  },
  fetchPopularFeedPhotos: {
    "isThumbnailsOnly": true,
    "limit": 18,
    "_method": "POST",
    "_version": "4.7.0",
    "_SessionToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOjI3MDc3OTgsImV4cCI6MTUzOTUzNTI1OTM2OH0.UK2qP1yk9QLk_Bkx1Ly0RPaitRYtec8ojZhzYRc0D-g"
  }
}

export const fetchPopularFeedPhotos = () => (dispatch) => {
  return fetch('http://api.pumpup.com/1/functions/feed/popular/load-batch', {
    headers: {'Content-Type': 'application/json'},
    method: 'POST',
    body: JSON.stringify(requestBodies.fetchPopularFeedPhotos)
  })
  .then((response) => response.json())
  .then((result) => dispatch({ type: types.FETCH_POPULAR_FEED_PHOTOS, payload: result }))
}

export const loadUserProfile = () => (dispatch) => {
  return fetch('http://api.pumpup.com/1/classes/User/318381', {
    headers: {'Content-Type': 'application/json'},
    method: 'POST',
    body: JSON.stringify(requestBodies.getUserProfile)
  })
  .then((response) => response.json())
  .then((result) => dispatch({ type: types.LOAD_USER_PROFILE, payload: result }))
}
