import * as React from 'react'
import {
  Text,
  TextInput
} from 'react-native'

interface State {
  locked: boolean;
}

// Really dumb little thing that protects a thing with a password
export default class Admin extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props)
    this.state = {locked: true}
  }

  render() {
    if (this.state.locked) {
      return (
        <TextInput style={{padding: 10, borderColor: '#eee', borderWidth: 1}} onChangeText={(text) => this.onChangeText(text)}/>
      )
    } else {
      return (
        <Text>Unlocked!</Text>
      )
    }
  }

  onChangeText(text: string) {
    if (text === "1234") {
      this.setState({locked: false})
    }
  }
}
