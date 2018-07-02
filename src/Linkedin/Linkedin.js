import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.css'

export class LinkedinSDK extends Component {
  static propTypes = {
    clientId: PropTypes.string.isRequired,
    callBack: PropTypes.func.isRequired,
    fields: PropTypes.string.isRequired,
    className: PropTypes.string,
    textButton: PropTypes.string,
    buttonType: PropTypes.string,
    icon: PropTypes.object
  }

  state = {
    loading: false
  }

  static defaultProps = {
    textButton: 'Login with Linkedin',
    buttonType: 'button',
    className: 'linkedin-sdk'
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
    this.setState({ loading: true })
    const { fields } = this.props
    window.IN.API.Raw(`/people/~${fields}`).result(r => {
      this.setState({ loading: false })
      this.props.callBack(r)
    })
  }

  authorize = e => {
    window.IN.User.authorize(this.callBack, '')
  }

  render() {
    const { textButton, className, buttonType, icon } = this.props
    const { loading } = this.state
    return (
      <button
        onClick={this.authorize}
        type={buttonType}
        className={className}
        disabled={loading}
      >
        {icon}
        {textButton}
      </button>
    )
  }
}
export default LinkedinSDK
