import React from 'react'

const BIO_MAX_LINES = 3

class UserProfile extends React.Component {

  constructor () {
    super()

    this.state = {
      expanded: false,
      bio: 'Achieve and celebrate your health goals with the world\'s most positive community! \n\nIt\'s #HealthyHolidays! Show us how you\'re staying healthy all month long 💪🌍\n\nFollow us on 👻 Snapchat @PumpUp\n\nRecipes + Workouts + Advice ⬇️',
      snippet: ''
    }

    this.truncateBio     = this.truncateBio.bind(this)
    this.toggleBio       = this.toggleBio.bind(this)
    this.addLinkMentions = this.addLinkMentions.bind(this)
  }

  toggleBio(){
    const { expanded } = this.state

    this.setState({
      expanded: !expanded,
      snippet: this.truncateBio()
    })
  }

  truncateBio () {
    const { bio } = this.state
    const truncatorNode = document.getElementById('truncator')
    const bioNode = document.getElementById('bio')

    // Nodes not yet rendered
    if (!truncatorNode || !bioNode) { return bio }

    const truncatorWidth = truncatorNode.offsetWidth
    const bioWidth = bioNode.offsetWidth

    if (truncatorWidth / BIO_MAX_LINES <= bioWidth) { return bio }

    const ratio = bioWidth / truncatorWidth * 100
    const lineLength = Math.floor(bio.length * ratio / 105)

    let newSnippet = ''

    for (let i = 0; i < BIO_MAX_LINES; ++i) {
      newSnippet += bio.slice(lineLength * i, lineLength * (i + 1))
    }

    console.log(ratio, lineLength)

    newSnippet = newSnippet.slice(0, -20)

    return newSnippet
  }

  addLinkMentions (text) {

    const linkify = (mention) => <a href={mention}>{mention}</a>
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
        finalString.push(linkify(text.slice(linkStartIndex, i)))
        linkStartIndex = -1
        base = i
      }
    }

    finalString.push(text.slice(base, text.length - 1))

    return finalString
  }

  componentWillMount () {
    this.setState({snippet: this.truncateBio()})
  }

  componentDidMount () {
    const runTruncate = () => this.setState({snippet: this.truncateBio()})
    runTruncate()
    window.addEventListener('resize', runTruncate)
  }

  componentWillUnmount () {
    const runTruncate = () => this.setState({snippet: this.truncateBio()})

    window.removeEventListener('resize', runTruncate)
  }

  render(){
    const { expanded, snippet, bio } = this.state

    const expandable = bio !== snippet

    let summary
    if (expanded) {
      summary = this.addLinkMentions(bio)
    } else {
      summary = this.addLinkMentions(snippet)
    }



    return (
      <div className='userContainer'>
        <img className='userThumbnail' alt='Profile Thumbnail' src="http://files.parsetfss.com/aac0413c-eada-4602-9451-2ee5da7d1241/tfss-a3052c36-5afe-4214-b34b-1a466dcfb9df-profilePic411168044.jpeg" />
        <div style={{width: '100%'}}>
          <h2 className='userName'>
            pumpup
          </h2>

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
export default UserProfile
