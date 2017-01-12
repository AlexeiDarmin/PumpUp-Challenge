import React, { PropTypes } from 'react'

import { addLinks } from '../utils/index'


const BIO_MAX_LINES = 3

const TRUNCATOR_STYLE = {
  position: 'absolute',
  visibility: 'hidden',
  height: 'auto',
  width: 'auto',
  whiteSpace: 'nowrap',
  overflow: 'auto',
  textOverflow: 'visible',
}

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

  }


  componentWillReceiveProps(nextProps) {

    const { bio }     = nextProps
    const { currBio } = this.props

    if (bio === currBio) { return null }

    this.setState({snippet: this.truncateBio(bio)})

  }


  shouldComponentUpdate(nextProps, nextState){

    const { truncatorNode, bioNode }      = this
    const { snippet, expanded }           = this.state

    const newSnippet           = nextState.snippet
    const newExpanded          = nextState.expanded

    if (!truncatorNode || !bioNode)  { return false }

    if (newSnippet !== snippet)      { return true }
    if (newExpanded !== expanded)    { return true }


    const { bio, name, profileThumbnail } = this.props

    const newBio                = nextProps.bio
    const newName               = nextProps.name
    const newProfileThumbnail   = nextProps.profileThumbnails

    if (bio !== newBio)                            { return true }
    if (name !== newName)                          { return true }
    if (newProfileThumbnail !== profileThumbnail)  { return true }


    return false

  }



  componentDidMount () {

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
    const { expanded, snippet }            = this.state
    const { bio, name, profileThumbnail }  = this.props.userProfile

    const expandable = bio !== snippet
    const summary = expanded ? addLinks(bio) : addLinks(snippet)

    // context for binding ref's to nodes
    const ctx = this


    return (
      <div className='userContainer'>

        <div
          className="userBio"
          style={TRUNCATOR_STYLE}
          ref={(node) => this.truncatorNode = node} >
          {bio}
        </div>

        <img className='userThumbnail' alt='Profile' src={profileThumbnail}/>
        <div style={{width: '100%'}}>
          <h2 className='userName'>{name}</h2>
          <span
            ref={(node) => ctx.bioNode = node}
            className='userBio'
            onClick={expandable ? this.toggleBio : null}
          >
            { summary }
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





  toggleBio = () => {

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
  truncateBio = (bio) => {
    const { truncatorNode, bioNode } = this

    if (!bio) { return '' }

    if (!truncatorNode || !bioNode) {
      return bio
    }


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
