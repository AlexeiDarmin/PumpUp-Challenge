import { combineReducers } from 'redux'

const defaults = {
  userProfile: {
    bio: '',
    name: '',
    profileThumbnail: ''
  },
  popularFeedPhotos: {
    thumbnails: []
  },
  slider: {
    thumbnails: []
  }
}
const userProfile = (state = defaults.userProfile, action) => {
  if (action.type === 'LOAD_USER_PROFILE'){
    return {
      bio: action.payload.bio,
      name: action.payload.name,
      profileThumbnail: action.payload.profileThumbnail
    }
  } else {
    return state
  }
}

const popularFeedPhotos = (state = defaults.popularFeedPhotos, action) => {
  if (action.type === 'FETCH_POPULAR_FEED_PHOTOS'){
    const photos = action.payload.result.posts.map((post) => post.thumbnail)
    return { thumbnails: photos }
  } else {
    return state
  }
}

const slider = (state = defaults.slider, action) => {
  if (action.type === 'FETCH_USER_FEED_PHOTOS'){
    const photos = action.payload.result.posts.map((post) => post.thumbnail)
    return { thumbnails: photos}
  }
  return state
}

export default combineReducers({
  userProfile,
  popularFeedPhotos,
  slider
})

export const getUserProfile = (state) => state.userProfile
export const getPopularPhotosFeed = (state) => state.popularFeedPhotos
export const getSlider = (state) => state.slider
