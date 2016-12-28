import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { getUserProfile, getPopularPhotosFeed } from '../reducers'
import UserProfile from '../components/UserProfile'
import PopularPhotosFeed from '../components/PopularPhotosFeed'

class App extends React.Component {
  render(){
    const { bio, name, profileThumbnail } = this.props.userProfile
    const { thumbnails } = this.props.popularPhotosFeed

    return (
      <div style={{maxWidth: 800, margin: 'auto'}}>
        <UserProfile
          bio={bio}
          name={name}
          profileThumbnail={profileThumbnail}
          />
        <PopularPhotosFeed thumbnails={thumbnails} />
      </div>
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
  userProfile:        getUserProfile(state),
  popularPhotosFeed:  getPopularPhotosFeed(state)
})

export default connect(
  mapStateToProps
)(App)
