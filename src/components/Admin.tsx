import * as React from 'react'
import {
  TextInput,
  View,
} from 'react-native'
import Config from 'react-native-config'

import Button from './StandardButton'

interface State {
  locked: boolean;
}

interface Props {
  onDestroyButtonPushed?: () => void;
}

// Really dumb little thing that protects a thing with a password
export default class Admin extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { locked: true }
  }

  render() {
    if (this.state.locked) {
      return (
        <TextInput secureTextEntry={true} style={{ padding: 10 }} onChangeText={(text) => this.onChangeText(text)} />
      )
    } else {
      return (
        <View>
          <Button onPress={this.props.onDestroyButtonPushed} >
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
