import React, { PropTypes } from 'react'



class PopularPhotosFeed extends React.Component {


  componentDidMount () {
    let rerender = () => this.forceUpdate()
    window.addEventListener('resize', rerender)
  }

  componentWillUnmount () {
    let rerender = () => this.forceUpdate()
    window.addRemoveListener('resize', rerender)

  }

  render(){
    const { thumbnails } = this.props

    const feedNode = document.getElementById('popularPhotosFeed')

    const width = feedNode ? feedNode.offsetWidth : 0

    let i = -1
    return (
      <div id='popularPhotosFeed' className='popularPhotosFeed'>
      {
        thumbnails.map((thumbnail) => {
          ++i

          return (
            <img
              src={thumbnail}
              key={i}
              alt='Popular'
              className='popularPhoto'
              style = {{height: width / 3 || 'auto'}}
            />
          )
        })
      }
      </div>
    )
  }
}

PopularPhotosFeed.propTypes = {
  thumbnails: PropTypes.array.isRequired
}

export default PopularPhotosFeed
