import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { getUserProfile, getPopularPhotosFeed, getSlider } from '../reducers'
import UserProfile from '../components/UserProfile'
import PopularPhotosFeed from '../components/PopularPhotosFeed'
import Slider from '../components/Slider'

class App extends React.Component {
  render(){
    const { bio, name, profileThumbnail } = this.props.userProfile
    const { thumbnails } = this.props.popularPhotosFeed
    const sliderThumbnails = this.props.slider.thumbnails

    return (
      <div>
        <UserProfile
          bio={bio}
          name={name}
          profileThumbnail={profileThumbnail}
          />
        <Slider thumbnails={sliderThumbnails}/>
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
  popularPhotosFeed:  getPopularPhotosFeed(state),
  slider:             getSlider(state)
})

export default connect(
  mapStateToProps
)(App)
