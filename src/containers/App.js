import React, { Component } from 'react'
import App from '../components/app/App'
import keypads from '../global/keypads'

class AppContainer extends Component {
  render() {
    return <App keys={keypads['basic']} displayValue={250} />
  }
}

export default AppContainer
