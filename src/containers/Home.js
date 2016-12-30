import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import {
  getUserProfile,
  getImageGrid,
  getSlider,
  getAllImages
} from '../reducers'

import UserProfile from '../components/UserProfile'
import ImageGrid from '../components/ImageGrid'
import Slider from '../components/Slider'

import {
  fetchUserProfile,
  fetchPopularFeedPhotos,
  fetchUserFeedPhotos
} from '../actions'



const loaderStyle = {width: '50%', margin: '30vh auto 0 auto', display: 'block'}



class Home extends React.Component {


  componentDidMount () {
    this.props.dispatch(fetchUserProfile())
    this.props.dispatch(fetchPopularFeedPhotos())
    this.props.dispatch(fetchUserFeedPhotos())
  }


  render(){

    const userProfile   = this.props.userProfile
    const sliderImages  = this.props.slider.images
    let gridImages      = this.props.imageGrid.images


    // optional use of createSelector, uncomment to override gridImages content.
    // gridImages = this.props.allImages.images


    let loaded = true
    if (userProfile.bio === '') { loaded = false }
    if (gridImages === [] || !gridImages)      { loaded = false}
    if (sliderImages === [])    { loaded = false}

    if (!loaded){
      return (<img style={loaderStyle} src='./images/loader.gif' alt='loader'/>)
    }

    return (
      <div>
        <UserProfile  userProfile={userProfile} />
        <Slider       thumbnails={sliderImages} />
        <ImageGrid    thumbnails={gridImages} />
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
    images: PropTypes.array.isRequired
  }),
  imageGrid: PropTypes.shape({
    images: PropTypes.array.isRequired
  }),
  dispatch: PropTypes.any.isRequired

}


const mapStateToProps = (state) => ({
  userProfile:        getUserProfile(state),
  imageGrid:          getImageGrid(state),
  slider:             getSlider(state),
  allImages:          getAllImages(state)
})


export default connect(
  mapStateToProps
)(Home)
