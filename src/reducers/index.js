import { combineReducers } from 'redux'

// import cart, * as fromCart from './cart'
// import products, * as fromProducts from './products'


const defaults = {
  userProfile: {
    bio: '',
    name: '',
    profileThumbnail: ''
  },
  popularFeedPhotos: {
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

export default combineReducers({
  userProfile,
  popularFeedPhotos
})

export const getUserProfile = (state) => state.userProfile
export const getPopularPhotosFeed = (state) => state.popularFeedPhotos
