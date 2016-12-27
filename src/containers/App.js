import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { getUserProfile } from '../reducers'

// import { checkout } from '../actions'

import UserProfile from '../components/UserProfile'

class App extends React.Component {
  render(){
    const { bio, name, profileThumbnail } = this.props.userProfile

    return (
      <UserProfile
        bio={bio}
        name={name}
        profileThumbnail={profileThumbnail}
        />
    )
  }
}

App.propTypes = {
  userProfile: PropTypes.shape({
    bio: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    profileThumbnail: PropTypes.string.isRequired
  }).isRequired
}


const mapStateToProps = (state) => ({
  userProfile: getUserProfile(state)
})

export default connect(
  mapStateToProps
)(App)
