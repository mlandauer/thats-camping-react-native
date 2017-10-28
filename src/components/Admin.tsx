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
    return (
      <View>
        <TextInput secureTextEntry={true} style={{ marginBottom: 20 }} onChangeText={(text) => this.onChangeText(text)} />
        <Hide hide={this.state.locked}>
          <Button onPress={this.props.onDestroyButtonPushed} >
            Destroy database
          </Button>
        </Hide>
      </View>
    )
  }

  onChangeText(text: string) {
    if (text === Config.ADMIN_PASSWORD) {
      this.setState({ locked: false })
    } else {
      this.setState({ locked: true })
    }
  }
}

function Hide(props: {hide: boolean, children: any}) {
  if (props.hide) {
    return null
  } else {
    return <View>{props.children}</View>
  }
}
