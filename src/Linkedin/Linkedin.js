import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class LinkedInLogin extends Component {
  static propTypes = {
    clientId: PropTypes.string.isRequired,
    callBack: PropTypes.func.isRequired,
    fields: PropTypes.string.isRequired,
    className: PropTypes.string,
    textButton: PropTypes.string
  }

  static defaultProps = {
    textButton: 'Login with Linkedin'
  }

  componentDidMount() {
    const { clientId } = this.props
    this.loadSDK(clientId)
  }

  loadSDK = clientId => {
    ;((d, s, id) => {
      const element = d.getElementsByTagName(s)[0]
      const ljs = element
      let js = element
      if (d.getElementById(id)) {
        return
      }
      js = d.createElement(s)
      js.id = id
      js.src = `//platform.linkedin.com/in.js`
      js.text = `api_key: ${clientId}`
      ljs.parentNode.insertBefore(js, ljs)
    })(document, 'script', 'linkedin-jssdk')
  }

  callBack = () => {
    const { fields } = this.props
    window.IN.API.Raw(`/people/~${fields}`).result(r => {
      this.props.callBack(r)
    })
  }

  authorize = e => {
    window.IN.User.authorize(this.callBack, '')
  }

  render() {
    const { textButton, className } = this.props
    return (
      <div>
        <button onClick={this.authorize} className={className}>
          {textButton}
        </button>
      </div>
    )
  }
}
export default LinkedInLogin
