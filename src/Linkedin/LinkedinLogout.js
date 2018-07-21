import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.css'

export class LinkedinLogout extends Component {
  static propTypes = {
    clientId: PropTypes.string.isRequired,
    callBack: PropTypes.func.isRequired,
    className: PropTypes.string,
    textButton: PropTypes.string,
    buttonType: PropTypes.string,
    icon: PropTypes.object
  }

  state = {
    loading: false
  }

  static defaultProps = {
    textButton: 'Logout from Linkedin',
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

  logout = e => {
    this.setState({loading: true});
    if (typeof window.IN === 'object' && typeof window.IN.User === 'object' && window.IN.User.isAuthorized()) {
      window.IN.User.logout(this.logoutCallBack, '')
    }
  }

  logoutCallBack = () => {
      this.setState({loading: false});
      this.props.callBack();
  }

  render() {
    const { textButton, className, buttonType, icon } = this.props
    const { loading } = this.state
    return (
      <button
        onClick={this.logout}
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
export default LinkedinLogout
