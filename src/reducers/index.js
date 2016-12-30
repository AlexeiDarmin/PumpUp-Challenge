import { combineReducers } from 'redux'

import userProfile from './userProfile'
import imageGrid from './imageGrid'
import slider from './slider'

export default combineReducers({
  userProfile,
  imageGrid,
  slider
})

export const getUserProfile = (state) => state.userProfile
export const getImageGrid = (state) => state.imageGrid
export const getSlider = (state) => state.slider
