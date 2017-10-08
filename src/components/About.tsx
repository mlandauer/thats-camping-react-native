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

export default class About extends React.Component<{}, {}> {
  render() {
    return (
      <ScrollView>
        <View style={{ padding: 20 }}>
          <Text style={styles.heading}>About That's Camping</Text>
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
            Made by Matthew Landauer. It's free and open source because that's the way it ought to be.
          </Text>
          <Button onPress={onPress}>
            Suggest a feature or report an issue
          </Button>
          <View style={{ marginTop: 20 }}>
            <Admin />
          </View>
        </View>
      </ScrollView>
    )
  }
}

function onPress() {
  Linking.openURL('https://github.com/mlandauer/thats-camping-react-native/issues')
}

const styles = StyleSheet.create({
  heading: {
    fontWeight: 'bold' as 'bold',
    fontSize: 20,
    marginBottom: 10
  },
  paragraph: {
    fontSize: 20,
    marginBottom: 10
  }
})
