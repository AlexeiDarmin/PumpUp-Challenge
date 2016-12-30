import { ADD_GRID_IMAGES } from '../constants/ActionTypes'


const initialState = {
  images: []
}


const imageGrid = (state = initialState, action) => {

  if (action.type === ADD_GRID_IMAGES){
    return { images: action.payload }
  }

  return state

}

export default imageGrid
