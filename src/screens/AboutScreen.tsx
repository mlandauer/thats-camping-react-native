import * as React from 'react'
import { Alert } from 'react-native'
import { Navigator } from 'react-native-navigation'
import * as Instabug from 'instabug-reactnative'

import About from '../components/About'
import * as Database from '../libs/Database'

interface Props {
  navigator: Navigator;
}

export default class AboutScreen extends React.Component<Props, {}> {
  static navigatorStyle = {
    tabBarHidden: true
  }

  async destroyDatabase() {
    await Database.destroy()
    Alert.alert("Database destroyed")
  }

  render() {
    return (
      <About
        onDestroyButtonPushed={() => this.destroyDatabase()}
        onSuggestButtonPushed={() => Instabug.invoke()}
      />
    )
  }
}
