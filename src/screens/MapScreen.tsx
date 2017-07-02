import * as React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

export default class MapScreen extends React.Component<{},{}> {
  // Duplicated from CampsiteIndexScreen
  // TODO: refactor
  static navigatorStyle = {
    navBarBackgroundColor: '#97b13d',
    navBarTextColor: '#fff',
    navBarButtonColor: '#fff',
    statusBarTextColorScheme: 'light',
    navBarTextFontSize: 22,
    navBarButtonFontSize: 22
  }

  render() {
    return (
      <View style={{padding: 20}}>
        <Text style={styles.paragraph}>
          The future home of maps
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  paragraph: {
    fontSize: 20,
    marginBottom: 10
  },
})
