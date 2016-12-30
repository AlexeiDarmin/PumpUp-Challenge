import { combineReducers } from 'redux'
import { createSelector } from 'reselect'

import userProfile from './userProfile'
import slider from './slider'
import imageGrid from './imageGrid'

export default combineReducers({
  userProfile,
  slider,
  imageGrid
})

export const getUserProfile  = (state) => state.userProfile
export const getSlider       = (state) => state.slider
export const getImageGrid    = (state) => state.imageGrid


/*
  Optional function using reselect since it's a requirement for the challenge.
  The function can be used inside the 'home.js' container
*/
export const getAllImages = createSelector(
  getSlider,
  getImageGrid,
  (slider, grid) => { return { images: slider.images.concat(grid.images)}}
)
