import React, { PropTypes } from 'react'


//TODO remove the last few remaining non-state bound variables
let rootNode        = undefined
let sliderFrameNode = undefined

class Slider extends React.Component {


  constructor(){
    super()

    this.state = {
      index: 0,
      xDown: undefined,
      containerNode: undefined,
      sliderNode: undefined
    }

    this.updateSlide      = this.updateSlide.bind(this)
    this.handleTouchStart = this.handleTouchStart.bind(this)
    this.handleTouchMove  = this.handleTouchMove.bind(this)
  }


  componentDidMount () {

    let rerender = () => this.forceUpdate()
    window.addEventListener('resize', rerender)

    const sliderFrame = document.getElementsByClassName('sliderFrame')[0]

    setTimeout(sliderFrame.addEventListener('touchstart', this.handleTouchStart, false), 0)
    setTimeout(sliderFrame.addEventListener('touchend', this.handleTouchMove, false), 0)

  }



  componentDidUpdate(){
    this.updateSlide()
  }


  componentWillUnmount () {
    let rerender = () => this.forceUpdate()
    window.addRemoveListener('resize', rerender)
  }

  render(){
    const { containerNode } = this.state
    const { thumbnails }    = this.props

    const sliderNode  = rootNode
    const width       = sliderNode ? sliderNode.offsetWidth : 0
    const frameWidth  = width * thumbnails.length

    const setRootNode = (node) => {
      if (!rootNode) {
        this.setState({
          containerNode: node,
          sliderNode: node.children[0]
        })
        rootNode        = node
        sliderFrameNode = node.children[0]
      }
    }

    return (
      <div className='sliderContainer'>
        <div className='slider' ref={setRootNode} style={{overflow: 'hidden'}}>
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
                  onClick={() => {this.setState({index: j})}}
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



  //////////////////////
  // SLIDER FUNCTIONS //
  //////////////////////





  /**
   * Triggers the first animation frame to go to the next Index's frame.
   */
  updateSlide() {

    const { index, containerNode, sliderNode } = this.state

    const frameWidth  = containerNode.offsetWidth
    const min         = 0
    const max         = sliderNode.offsetWidth
    const destination = index * frameWidth

    // Enforce bounds on frames
    if (destination < min)  { return }
    if (destination >= max) { return }

    // Decrease speed relative to number of indecies being animated
    const frames  = Math.ceil(Math.abs(destination - containerNode.scrollLeft) / frameWidth)
    const speed   = Math.round(((destination - containerNode.scrollLeft) / 10) + 1) / frames

    window.requestAnimationFrame(() => {
      animateScrollFrame(containerNode, destination, speed)
    })

  }


  /**
   * Stores the starting x position of a touch event
   * @param  {event} e touch event
   */
   handleTouchStart (e) {
    this.setState({xDown: e.touches[0].clientX})
  }


  /**
   * Modifies index of slideshow if the swipe is large enough
   * @param  {event} e touch event
   */
  handleTouchMove (e) {
    const {xDown, containerNode, sliderNode, index} = this.state

    if (!xDown) { return }

    const xUp    = e.changedTouches[0].clientX
    const xDiff = xDown - xUp

    const frameWidth  = containerNode.offsetWidth

    //BUG disable inertial scrolling

    let nextIndex
    if (xDiff > 0 && xDiff > frameWidth / 3) {
      // Left swipe above threshold
      nextIndex = index + 1
    } else if (xDiff < 0 && xDiff < frameWidth / 3) {
      // Right swipe above threshold
      nextIndex = index - 1
    }

    if (isValidIndex(containerNode, sliderNode, nextIndex)){
      this.setState({
        index: nextIndex,
        xDown: null
      })
    }

  }

}




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
 * Returns true if the index is within the bounds of the container and slider elements.
 * @param  {Object} container DOM node that is the slider container
 * @param  {Object} slider DOM node that is the slider with scrollLeft property
 * @param  {Int}    index the next index to go to
 */
const isValidIndex = (container, slider, index) => {
  const max = (slider.offsetWidth / container.offsetWidth) - 1
  if (index >= 0 && index <= max) return true
}



Slider.propTypes = {
  thumbnails: PropTypes.array.isRequired
}

export default Slider
