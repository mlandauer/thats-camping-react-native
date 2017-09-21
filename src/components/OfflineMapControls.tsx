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
  if (props.progress < 1) {
    return (
      <View style={{ padding: 14}}>
        <Text style={styles.progressLabelText}>Downloading Offline: {Math.round(props.progress * 100)}% Complete</Text>
        <ProgressViewIOS progress={props.progress} progressViewStyle="bar" />
      </View>
    )
  } else {
    return null
  }
}

const styles = StyleSheet.create({
  progressLabelText: {
    fontSize: 14,
    color: '#777',
    paddingBottom: 9
  }
})
