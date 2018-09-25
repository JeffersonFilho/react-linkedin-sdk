# React Linkedin SDK

> A React Component for Linkedin SDK

## Getting Started

```shell
yarn add react-linkedin-sdk
or
npm install react-linkedin-sdk --save
```

## How to use

### Basic

```js
import React from 'react'
import ReactDOM from 'react-dom'
import LinkedinSDK from 'react-linkedin-sdk'

const responseLinkedin = response => {
  console.log(response)
}

ReactDOM.render(
  <LinkedinSDK
    clientId="123456789010"
    callBack={responseLinkedin}
    fields=":(id,num-connections,picture-url)"
    className={'className'}
    loginButtonText={'Login with Linkedin'}
    logoutButtonText={'Logout from Linkedin'}
    buttonType={'button'}
    icon={<Icon />}
    getOAuthToken
  />,
  document.getElementById('demo')
)
```

### Custom permission

By default the component, request only 'public_profile' permission, you can add more permissions on your app.

see https://developer.linkedin.com/docs/fields for permissions list

```js
import React from 'react'
import LinkedinSDK from 'react-linkedin-sdk'

class MyComponent extends React.Component {
  responseLinkedin(response) {
    console.log(response)
  }

  render() {
    return (
      <LinkedinSDK
        clientId="123456789010"
        callBack={responseLinkedin}
        fields=":(id,num-connections,picture-urls::(original))"
        className={'className'}
        loginButtonText={'Login with Linkedin'}
        logoutButtonText={'Logout from Linkedin'}
        buttonType={'button'}
        icon={<Icon />}
        getOAuthToken
      />
    )
  }
}

export default MyComponent
```

## Parameters

|      params      |  value   |    default value     |
| :--------------: | :------: | :------------------: |
|     clientId     |  string  |       Required       |
|      fields      |  string  |       Required       |
|     callback     | function |       Required       |
|    className     |  string  |         none         |
| loginButtonText  |  string  | Login with Linkedin  |
| logoutButtonText |  string  | Logout from Linkedin |
|    buttonType    |  string  |        button        |
|       icon       |  string  |         none         |
|  getOAuthToken   |   bool   |        false         |
