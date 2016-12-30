import React, { PropTypes } from 'react'

const ImageGrid = ({thumbnails}) => (
  <div className='photoGrid'>
    {
      thumbnails.map((thumbnail, i) => (
          <img
            src={thumbnail}
            key={i}
            alt='Popular'
            className='gridPhoto'
          />
        )
      )
    }
  </div>
)

ImageGrid.propTypes = {
  thumbnails: PropTypes.array.isRequired
}

export default ImageGrid
