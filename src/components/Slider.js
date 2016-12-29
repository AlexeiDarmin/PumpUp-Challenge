import React, { PropTypes } from 'react'


const animateScrollLeft = (node, destination, speed, min, max) => {
  if (node.scrollLeft === destination) return
  if (destination < min) return // stop scrolling left
  if (destination >= max) return // stop scrolling right

  if (Math.abs(node.scrollLeft - destination) < Math.abs(speed)) {
    node.scrollLeft = destination
    return
  }

  node.scrollLeft += speed

  console.log(node.scrollLeft, destination, speed)

  window.requestAnimationFrame(() => animateScrollLeft(node, destination, speed))
}

var xDown = null;
var yDown = null;
var currIndex = null

function handleTouchStart(evt) {
    console.log('something is happened')
    xDown = evt.touches[0].clientX;
    yDown = evt.touches[0].clientY;

    let scrollNode = evt.target.parentNode.parentNode
    const frameWidth = evt.target.offsetWidth
    currIndex = Math.floor(scrollNode.scrollLeft / frameWidth)
};

function handleTouchMove(evt) {
    // evt.preventDefault()
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.changedTouches[0].clientX;
    var yUp = evt.changedTouches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    const el = evt.target
    const frameWidth = el.offsetWidth

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
      const scrollNode = el.parentNode.parentNode

      // Disables inertial scrolling
      scrollNode.style.overflow = 'hidden'
      setTimeout(() => {
        scrollNode.style.overflow = ''

        setTimeout(() => {
          let destination, speed
          let index = currIndex

          if ( xDiff > 0 ) {
              /* left swipe */
              if (xDiff > frameWidth / 3) {
                destination = (index + 1) * frameWidth
              } else {
                destination = index * frameWidth
              }
          } else {
              /* right swipe */
              if (xDiff < frameWidth / -3){
                destination = (index - 1) * frameWidth
              } else {
                destination = index * frameWidth
              }
          }
          let min = 0
          let max = el.parentNode.offsetWidth
          speed = Math.round(((destination - scrollNode.scrollLeft) / 5) + 1)
          window.requestAnimationFrame(() => animateScrollLeft(scrollNode, destination, speed, min, max))

          /* reset values */
          xDown = null;
          yDown = null
        }, 20)
      }, 20)
    }
}

class Slider extends React.Component {


  componentDidMount () {
    let rerender = () => this.forceUpdate()
    window.addEventListener('resize', rerender)


    const sliderFrame = document.getElementsByClassName('sliderFrame')[0]

    setTimeout(sliderFrame.addEventListener('touchstart', handleTouchStart, false), 0)
    setTimeout(sliderFrame.addEventListener('touchend', handleTouchMove, false), 0)

  }

  componentWillUnmount () {
    let rerender = () => this.forceUpdate()
    window.addRemoveListener('resize', rerender)

  }

  render(){
    const { thumbnails } = this.props

    const sliderNode = document.getElementById('slider')

    const width = sliderNode ? sliderNode.offsetWidth : 0
    const frameWidth = width * thumbnails.length

    let i = -1
    return (
      <div className='slider' id='slider'>
        <div className='sliderFrame' style={{width: frameWidth}}>
        {
          thumbnails.map((thumbnail) => {
            ++i
            return (
              <img
                src={thumbnail}
                alt='Slider'
                className='sliderPhoto'
                key={i}
                style={{width: width, height: width}}
              />
            )
          })
        }
        </div>
      </div>
    )
  }
}

Slider.propTypes = {
  thumbnails: PropTypes.array.isRequired
}

export default Slider
