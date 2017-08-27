import * as React from 'react'
import {
  TextInput,
  StyleSheet,
  View,
  Alert
} from 'react-native'
import Button from 'react-native-button'
import Config from 'react-native-config'

import * as Database from '../libs/Database'

interface State {
  locked: boolean;
}

interface Props {
  onOfflineMaps: () => void;
}

// Really dumb little thing that protects a thing with a password
export default class Admin extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {locked: true}
  }

  async resetCampsites() {
    await Database.resetCampsites()
    Alert.alert("Campsites reset")
  }

  async destroyDatabase() {
    await Database.destroy()
    Alert.alert("Database destroyed")
  }

  render() {
    if (this.state.locked) {
      return (
        <TextInput secureTextEntry={true} style={{padding: 10}} onChangeText={(text) => this.onChangeText(text)}/>
      )
    } else {
      return (
        <View>
          <Button
            containerStyle={styles.buttonContainer}
            style={styles.buttonText}
            onPress={() => this.resetCampsites()} >
            Reset campsites
          </Button>
          <Button
            containerStyle={styles.buttonContainer}
            style={styles.buttonText}
            onPress={() => this.destroyDatabase()} >
            Destroy database
          </Button>
          <Button
            containerStyle={styles.buttonContainer}
            style={styles.buttonText}
            onPress={this.props.onOfflineMaps} >
            Offline maps
          </Button>
        </View>
      )
    }
  }

  onChangeText(text: string) {
    if (text === Config.ADMIN_PASSWORD) {
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
    borderWidth: 0.5,
    marginBottom: 10
  },
  buttonText: {
    fontSize: 18,
    color: '#777'
  }
})
