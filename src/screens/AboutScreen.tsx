import * as React from 'react'

import About from '../components/About'

export default class AboutScreen extends React.Component<{},{}> {
  static navigatorStyle = {
    tabBarHidden: true
  }

  render() {
    return (
      <About />
    )
  }
}
