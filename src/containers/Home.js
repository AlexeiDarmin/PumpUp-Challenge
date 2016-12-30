import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { getUserProfile, getImageGrid, getSlider } from '../reducers'

import UserProfile from '../components/UserProfile'
import ImageGrid from '../components/ImageGrid'
import Slider from '../components/Slider'



class Home extends React.Component {
  render(){
    const { bio, name, profileThumbnail } = this.props.userProfile
    const { thumbnails } = this.props.imageGrid
    const sliderThumbnails = this.props.slider.thumbnails

    return (
      <div>
        <UserProfile
          bio={bio}
          name={name}
          profileThumbnail={profileThumbnail}
          />
        <Slider thumbnails={sliderThumbnails}/>
        <ImageGrid thumbnails={thumbnails} />
      </div>
    )
  }
}


Home.propTypes = {
  userProfile: PropTypes.shape({
    bio:              PropTypes.string.isRequired,
    name:             PropTypes.string.isRequired,
    profileThumbnail: PropTypes.string.isRequired
  }).isRequired,
  slider: PropTypes.shape({
    thumbnails: PropTypes.array.isRequired
  }),
  imageGrid: PropTypes.shape({
    thumbnails: PropTypes.array.isRequired
  })
}


const mapStateToProps = (state) => ({
  userProfile:        getUserProfile(state),
  imageGrid:          getImageGrid(state),
  slider:             getSlider(state)
})


export default connect(
  mapStateToProps
)(Home)
