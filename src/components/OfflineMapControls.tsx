import * as React from 'react'
import {
  View,
  StyleSheet,
  Text,
  ProgressViewIOS
} from 'react-native'

interface Props {
  progress: number;
}

export default function OfflineMapControls(props: Props) {
  return (
    <View style={{ padding: 20 }}>
      <Text style={styles.progressLabelText}>Downloading: {Math.round(props.progress * 100)}% Complete</Text>
      <ProgressViewIOS progress={props.progress} progressViewStyle="bar" />
    </View>
  )
}

const styles = StyleSheet.create({
  labelText: {
    fontSize: 18,
    color: '#777'
  },
  progressLabelText: {
    fontSize: 18,
    color: '#777',
    paddingTop: 18,
    paddingBottom: 9
  }
})
