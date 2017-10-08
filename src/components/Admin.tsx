import * as React from 'react'
import {
  TextInput,
  View,
  Alert
} from 'react-native'
import Config from 'react-native-config'

import * as Database from '../libs/Database'
import Button from './StandardButton'

interface State {
  locked: boolean;
}

// Really dumb little thing that protects a thing with a password
export default class Admin extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props)
    this.state = { locked: true }
  }

  async destroyDatabase() {
    await Database.destroy()
    Alert.alert("Database destroyed")
  }

  render() {
    if (this.state.locked) {
      return (
        <TextInput secureTextEntry={true} style={{ padding: 10 }} onChangeText={(text) => this.onChangeText(text)} />
      )
    } else {
      return (
        <View>
          <Button onPress={() => this.destroyDatabase()} >
            Destroy database
          </Button>
        </View>
      )
    }
  }

  onChangeText(text: string) {
    if (text === Config.ADMIN_PASSWORD) {
      this.setState({ locked: false })
    }
  }
}
