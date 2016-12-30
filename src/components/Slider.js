import React, { PropTypes } from 'react'


/*TODO
  1 - replace getElementById with ref's
  2 - replace global vars with local state
  3 - remove ambigious node references from functions like `el.parentNode.parentNode`
  4 - profit
*/


let xDown = null
let currIndex = null

class Slider extends React.Component {


  componentWillReceiveProps(nextProps){
    console.log(nextProps)
  }


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

    return (
      <div className='sliderContainer'>
        <div className='slider' id='slider'>
          <div className='sliderFrame' style={{width: frameWidth}}>
          {
            thumbnails.map((thumbnail, i) => (
                <img
                  src={thumbnail}
                  alt='Slider'
                  className='sliderPhoto'
                  key={i}
                  style={{width: width, height: width}}
                />
              )
            )
          }
          </div>
        </div>
        <div className='sliderNav'>
          {
            thumbnails.map((thumbnail, j) => (
                <div
                  onClick={() => {
                    currIndex = j
                    const node = document.getElementsByClassName('sliderPhoto')[0]
                    goToFrame(node)
                  }}
                  className='sliderNavIcon'
                  key={j}
                />
              )
            )
          }
        </div>
      </div>
    )
  }
}





//////////////////////
// SLIDER FUNCTIONS //
//////////////////////


/**
 * Animates scroll frames linearly until destination is reached.
 * @param  {Object} node DOM node that is used to animate slider.
 * @param  {Int} destination desired `.scrollLeft` property of node
 * @param  {Int} speed the amount of px to scroll per animation frame
 */
function animateScrollFrame (node, destination, speed) {

  node.scrollLeft += speed

  if (node.scrollLeft === destination) { return }

  const difference = Math.abs(node.scrollLeft - destination)

  if (difference < Math.abs(speed)) {
    node.scrollLeft = destination
  } else {
    window.requestAnimationFrame(() => {
      animateScrollFrame(node, destination, speed)
    })
  }

}



/**
 * Stores the starting position of a touch event
 * @param  {event} e touch event
 */
function handleTouchStart (e) {

  xDown = e.touches[0].clientX

  let scrollNode = e.target.parentNode.parentNode
  const frameWidth = e.target.offsetWidth
  currIndex = Math.floor(scrollNode.scrollLeft / frameWidth)

}



/**
 * Triggers the first animation frame to go to the currIndex's frame.
 * @param  {Object} el is a frame element of the slider.
 */
function goToFrame (el) {

  const frameWidth  = el.offsetWidth
  const node        = el.parentNode.parentNode

  const min         = 0
  const max         = el.parentNode.offsetWidth
  const destination = currIndex * frameWidth

  // Enforce bounds on frames
  if (destination < min)  { return }
  if (destination >= max) { return }

  // Decrease speed relative to number of indecies being animated
  const frames = Math.ceil(Math.abs(destination - node.scrollLeft) / frameWidth)
  const speed = Math.round(((destination - node.scrollLeft) / 5) + 1) / frames

  window.requestAnimationFrame(() => {
    animateScrollFrame(node, destination, speed)
  })

}



/**
 * Modifies index of slideshow if the swipe is large enough
 * @param  {event} e touch event
 */
function handleTouchMove (e) {
  if (!xDown) { return }

  const xUp = e.changedTouches[0].clientX

  let xDiff = xDown - xUp

  const el          = e.target
  const frameWidth  = el.offsetWidth
  const scrollNode  = el.parentNode.parentNode

  /*
    Disables inertial scrolling on all devices by temporarily disabling overflow.
    The setTimeouts are necassary to allow the DOM to render at least one frame
    with the desired CSS properties before continueing.
  */
  scrollNode.style.overflow = 'hidden'
  setTimeout(() => {
    scrollNode.style.overflow = ''
    setTimeout(() => {
      if (xDiff > 0 && xDiff > frameWidth / 3) {
        // Left swipe above threshold
        currIndex += 1
      } else if (xDiff < 0 && xDiff < frameWidth / 3) {
        // Right swipe above threshold
        currIndex -= 1
      }
      goToFrame(el)
      /* reset values */
      xDown = null
    }, 20)
  }, 20)

}


Slider.propTypes = {
  thumbnails: PropTypes.array.isRequired
}

export default Slider
