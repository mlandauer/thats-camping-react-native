import * as React from 'react'
import {
  TextInput,
  View,
} from 'react-native'
import Config from 'react-native-config'

import Button from './StandardButton'

interface State {
}

interface Props {
  onDestroyButtonPushed?: () => void;
  text?: string;
  onTextChanged?: (text: string) => void
  showStateChanges?: boolean;
  onToggleShowStateChanges?: () => void;
}

// Really dumb little thing that protects a thing with a password
export default class Admin extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    return (
      <View>
        <TextInput secureTextEntry={true} style={{ marginBottom: 20 }} value={this.props.text} onChangeText={(text) => this.onChangeText(text)} />
        <Hide hide={this.props.text !== Config.ADMIN_PASSWORD}>
          <Button onPress={this.props.onDestroyButtonPushed} >
            Destroy database
          </Button>
          <Button onPress={this.props.onToggleShowStateChanges}>
            {this.props.showStateChanges ? "Hide" : "Show"} state changes
          </Button>
        </Hide>
      </View>
    )
  }

  onChangeText(text: string) {
    if (this.props.onTextChanged) {
      this.props.onTextChanged(text)
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
