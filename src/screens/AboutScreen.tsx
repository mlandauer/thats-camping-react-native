import * as React from 'react'
import { Navigator } from 'react-native-navigation'

import About from '../components/About'

interface Props {
  navigator: Navigator;
}

export default class AboutScreen extends React.Component<Props, {}> {
  static navigatorStyle = {
    tabBarHidden: true
  }

  render() {
    return (
      <About />
    )
  }
}
