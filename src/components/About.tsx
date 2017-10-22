import * as React from 'react'
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Linking,
} from 'react-native'

import Admin from './Admin'
import Button from './StandardButton'

interface Props {
  onDestroyButtonPushed?: () => void;
}

export default class About extends React.Component<Props, {}> {
  render() {
    return (
      <ScrollView>
        <View style={{ padding: 20 }}>
          <Text style={styles.paragraph}>
            Find campsites near you in New South Wales, Australia.
            It covers camping on public, common land such as National Parks,
            State Forests and Local Council land.
          </Text>
          <Text style={styles.paragraph}>
            It works <Text style={{ fontWeight: 'bold' }}>completely offline</Text>, even when you're
            far far away from a mobile phone tower. When does that ever happen
            while camping?
          </Text>
          <Text style={styles.paragraph}>
            Designed and developed by Matthew Landauer. Icon design by
            Gabriel Clark and Joanna Hill.
          </Text>
          <View style={{marginBottom: 20}}>
            <Button onPress={onPress}>
              Suggest a feature or report an issue
            </Button>
          </View>
          <Admin onDestroyButtonPushed={this.props.onDestroyButtonPushed}/>
        </View>
      </ScrollView>
    )
  }
}

function onPress() {
  Linking.openURL('https://github.com/mlandauer/thats-camping-react-native/wiki/Suggest-a-feature-or-report-an-issue')
}

const styles = StyleSheet.create({
  paragraph: {
    fontSize: 20,
    marginBottom: 20
  }
})
