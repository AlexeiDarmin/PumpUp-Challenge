import { combineReducers } from 'redux'
// import cart, * as fromCart from './cart'
// import products, * as fromProducts from './products'

const userProfile = (state = {}, action) => {
  if (action.type === 'LOAD_USER_PROFILE'){
    return {
      bio: 'Achieve and celebrate your health goals with the world\'s most positive community! \n\nIt\'s #HealthyHolidays! Show us how you\'re staying healthy all month long 💪🌍\n\nFollow us on 👻 Snapchat @PumpUp\n\nRecipes + Workouts + Advice ⬇️',
      name: 'pumpup',
      profileThumbnail: 'http://files.parsetfss.com/aac0413c-eada-4602-9451-2ee5da7d1241/tfss-a3052c36-5afe-4214-b34b-1a466dcfb9df-profilePic411168044.jpeg'
    }
  } else {
    return state
  }
}

export default combineReducers({
  userProfile
})

export const getUserProfile = (state) => state.userProfile


// const getAddedIds = state => fromCart.getAddedIds(state.cart)
// const getQuantity = (state, id) => fromCart.getQuantity(state.cart, id)
// const getProduct = (state, id) => fromProducts.getProduct(state.products, id)
//
// export const getTotal = state =>
//   getAddedIds(state)
//     .reduce((total, id) =>
//       total + getProduct(state, id).price * getQuantity(state, id),
//       0
//     )
//     .toFixed(2)
//
// export const getCartProducts = state =>
//   getAddedIds(state).map(id => ({
//     ...getProduct(state, id),
//     quantity: getQuantity(state, id)
//   }))
