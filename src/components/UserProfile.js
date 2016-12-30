import React, { PropTypes } from 'react'

const BIO_MAX_LINES = 3

class UserProfile extends React.Component {

  constructor () {
    super()

    this.state = {
      expanded: false,
      snippet: ''
    }

    this.truncateBio     = this.truncateBio.bind(this)
    this.toggleBio       = this.toggleBio.bind(this)
    this.addLinkMentions = this.addLinkMentions.bind(this)
  }

  toggleBio(){
    const { expanded } = this.state
    const { bio } = this.props

    this.setState({
      expanded: !expanded,
      snippet: this.truncateBio(bio)
    })
  }

  truncateBio (bio) {
    const truncatorNode = document.getElementById('truncator')
    const bioNode = document.getElementById('bio')

    // Abort if nodes are not yet rendered
    if (!truncatorNode || !bioNode) { return bio }

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

  addLinkMentions (text) {
    const linkify = (mention, i) => <a href={mention} key={i}>{mention}</a>
    let finalString = []
    let linkStartIndex = -1
    let base = 0

    for (let i = 0, len = text.length; i < len; ++i){
      let c = text[i]

      if ((c === '#' || c === '@') && linkStartIndex === -1) {
        linkStartIndex = i
        finalString.push(' ' + text.slice(base, i - 1) + ' ')
        base = i
      } else if (linkStartIndex !== -1 && (c === ' ' || c === '\n')){
        finalString.push(linkify(text.slice(linkStartIndex, i), i))
        linkStartIndex = -1
        base = i
      }
    }

    finalString.push(text.slice(base, text.length - 1))

    return finalString
  }

  componentWillReceiveProps(nextProps) {
    const { bio } = nextProps

    //Allows DOM to render before calling truncateBio
    setTimeout(() => this.setState({snippet: this.truncateBio(bio)}), 0)
  }

  componentDidMount () {
    const { bio } = this.props

    //Allows DOM to render before calling truncateBio
    setTimeout(() => this.setState({snippet: this.truncateBio(bio)}), 0)

    const runTruncate = () => {
      this.setState({snippet: this.truncateBio(this.props.bio)})
    }
    runTruncate()
    window.addEventListener('resize', runTruncate)
  }

  componentWillUnmount () {
    const runTruncate = () => {
      return this.setState({snippet: this.truncateBio(this.props.bio)})
    }

    window.removeEventListener('resize', runTruncate)
  }

  render(){
    const { expanded, snippet } = this.state
    const { bio, name, profileThumbnail } = this.props

    const expandable = bio !== snippet

    let summary
    if (expanded) {
      summary = this.addLinkMentions(bio)
    } else {
      summary = this.addLinkMentions(snippet)
    }

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
            { summary }
            { expanded && expandable ? ' ...show less' : ''}
            { (expandable && !expanded) ? ' ...read more' : '' }
          </span>
        </div>
      </div>
    )
  }
}

UserProfile.propTypes = {
  bio: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  profileThumbnail: PropTypes.string.isRequired
}

export default UserProfile
