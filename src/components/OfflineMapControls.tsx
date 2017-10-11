import * as React from 'react'
import {
  View,
  StyleSheet,
  Text,
  ProgressViewIOS
} from 'react-native'

interface Props {
  progress: number;
  reloadProgress: number;
}

export default function OfflineMapControls(props: Props) {
  return (
    <View>
      <DownloadProgress progress={props.progress} />
      <ReloadProgress progress={props.reloadProgress} />
    </View>
  )
}

function DownloadProgress(props: {progress: number}) {
  if (props.progress > 0 && props.progress < 1) {
    return (
      <View style={{ padding: 14}}>
        <Text style={styles.progressLabelText}>Downloading Offline Map: {Math.round(props.progress * 100)}% Complete</Text>
        <ProgressViewIOS progress={props.progress} progressViewStyle="bar" />
      </View>
    )
  } else {
    return null
  }
}

function ReloadProgress(props: {progress: number}) {
  if (props.progress > 0 && props.progress < 1) {
    return (
      <View style={{ padding: 14}}>
        <Text style={styles.progressLabelText}>Reloading Offline Map: {Math.round(props.progress * 100)}% Complete</Text>
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
