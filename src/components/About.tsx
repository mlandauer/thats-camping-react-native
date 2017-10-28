import * as React from 'react'
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
} from 'react-native'

import Admin from './Admin'

interface Props {
  onDestroyButtonPushed?: () => void;
  adminText?: string;
  onAdminTextChanged?: (text: string) => void;
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
          <Text style={styles.paragraph}>
            We want to hear from you. To <Text style={{ fontWeight: 'bold' }}>suggest an improvement</Text> or <Text style={{ fontWeight: 'bold' }}>report a problem</Text> simply shake your phone while you're on the relevant page.
          </Text>
          <Admin onDestroyButtonPushed={this.props.onDestroyButtonPushed} text={this.props.adminText} onTextChanged={this.props.onAdminTextChanged}/>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  paragraph: {
    fontSize: 20,
    marginBottom: 20
  }
})
