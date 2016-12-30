import { ADD_USER_PROFILE } from '../constants/ActionTypes'



const initialState = {
  bio: '',
  name: '',
  profileThumbnail: ''
}


const userProfile = (state = initialState, action) => {

  if (action.type === ADD_USER_PROFILE){
    return {
      bio: action.payload.bio,
      name: action.payload.name,
      profileThumbnail: action.payload.profileThumbnail
    }
  }

  return state

}

export default userProfile
