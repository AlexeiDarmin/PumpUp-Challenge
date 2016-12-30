import { ADD_SLIDER_IMAGES } from '../constants/ActionTypes'


const initialState = {
  images: []
}


const slider = (state = initialState, action) => {

  if (action.type === ADD_SLIDER_IMAGES){
    return { images: action.payload }
  }

  return state

}

export default slider
