import { FETCH_POPULAR_FEED_PHOTOS } from '../constants/ActionTypes'


const initialState = {
  thumbnails: []
}

const imageGrid = (state = initialState, action) => {

  if (action.type === FETCH_POPULAR_FEED_PHOTOS){
    const photos = action.payload.result.posts.map((post) => post.thumbnail)
    return { thumbnails: photos }
  }

  return state
  
}

export default imageGrid
