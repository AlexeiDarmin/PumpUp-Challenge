import React, { PropTypes } from 'react'

import { addLinks } from '../utils/index'


const BIO_MAX_LINES = 3

//TODO Refactor to use react refs instead of document.getElementById('truncator')

class UserProfile extends React.Component {



  ////////////////////////
  // LIFE CYCLE METHODS //
  ////////////////////////





  constructor () {
    super()

    this.state = {
      expanded: false,
      snippet: ''
    }

    this.truncateBio  = this.truncateBio.bind(this)
    this.toggleBio    = this.toggleBio.bind(this)
  }


  componentWillReceiveProps(nextProps) {

    const { bio } = nextProps
    const { currBio } = this.state

    if (bio === currBio) { return null }

    setTimeout(() => this.setState({snippet: this.truncateBio(bio)}), 0)
  }


  componentDidMount () {
    const { bio } = this.props.userProfile

    //Allows DOM to render before calling truncateBio
    setTimeout(() => this.setState({snippet: this.truncateBio(bio)}), 0)

    const runTruncate = () => {
      this.setState({snippet: this.truncateBio(this.props.userProfile.bio)})
    }
    runTruncate()
    window.addEventListener('resize', runTruncate)
  }


  componentWillUnmount () {
    const runTruncate = () => {
      return this.setState({snippet: this.truncateBio(this.props.userProfile.bio)})
    }

    window.removeEventListener('resize', runTruncate)
  }


  render(){

    const { expanded, snippet }           = this.state
    const { bio, name, profileThumbnail } = this.props.userProfile

    const expandable = bio !== snippet
    const summary = expanded ? addLinks(bio) : addLinks(snippet)

    return (
      <div className='userContainer'>

        <div id="truncator" className="userBio"> {bio} </div>

        <img className='userThumbnail' alt='Profile' src={profileThumbnail}/>
        <div style={{width: '100%'}}>
          <h2 className='userName'>{name}</h2>
          <span
            id='bio'
            className='userBio'
            onClick={expandable ? this.toggleBio : null}
          >
            {typeof summary !== 'string' ? summary.map((part, i) => part) : ''}
            { expanded && expandable  ? ' ...show less' : '' }
            { expandable && !expanded ? ' ...read more' : '' }
          </span>
        </div>
      </div>
    )
  }



  /////////////
  // HELPERS //
  /////////////





  toggleBio(){

    const { expanded }  = this.state
    const { bio }       = this.props.userProfile

    this.setState({
      expanded: !expanded,
      snippet: this.truncateBio(bio)
    })

  }


  /**
   * Truncates input to a maximum of 3 lines long when printed in the DOM element with the Id 'bio'.
   * @param  {String} bio is the text to be truncated.
   * @return {String} shorter version of bio.
   */
  truncateBio (bio) {
    if (!bio || !bio.length) { return '' }

    const truncatorNode = document.getElementById('truncator')
    const bioNode       = document.getElementById('bio')

    // Abort if nodes are not yet rendered
    if (!truncatorNode || !bioNode) { return '' }

    const truncatorWidth = truncatorNode.offsetWidth
    const bioWidth = bioNode.offsetWidth

    if (truncatorWidth / BIO_MAX_LINES <= bioWidth) { return bio }

    const ratio = bioWidth / truncatorWidth * 100
    const lineLength = Math.floor(bio.length * ratio / 100)

    let newSnippet = ''

    for (let i = 0; i < BIO_MAX_LINES; ++i) {
      newSnippet += bio.substring(lineLength * i, lineLength * (i + 1))
    }

    newSnippet = newSnippet.slice(0, -1 * (lineLength / 1.75))

    return newSnippet
  }

}


UserProfile.propTypes = {
  userProfile: PropTypes.shape({
    bio: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    profileThumbnail: PropTypes.string.isRequired
  }).isRequired
}

export default UserProfile
