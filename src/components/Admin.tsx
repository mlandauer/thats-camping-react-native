import * as React from 'react'
import {
  TextInput,
  StyleSheet
} from 'react-native'
import Button from 'react-native-button'

interface State {
  locked: boolean;
}

// Really dumb little thing that protects a thing with a password
export default class Admin extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props)
    this.state = {locked: true}
  }

  onPress() {

  }

  render() {
    if (this.state.locked) {
      return (
        <TextInput style={{padding: 10, borderColor: '#eee', borderWidth: 1}} onChangeText={(text) => this.onChangeText(text)}/>
      )
    } else {
      return (
        <Button
          containerStyle={styles.buttonContainer}
          style={styles.buttonText}
          onPress={this.onPress} >
          Reset campsite data
        </Button>
      )
    }
  }

  onChangeText(text: string) {
    if (text === "1234") {
      this.setState({locked: false})
    }
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 10,
    height: 45,
    overflow: 'hidden',
    borderRadius: 4,
    borderWidth: 0.5
  },
  buttonText: {
    fontSize: 18,
    color: '#777'
  }
})
