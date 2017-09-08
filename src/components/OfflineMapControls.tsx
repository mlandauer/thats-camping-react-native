import * as React from 'react'
import {
  View,
  StyleSheet,
  Switch,
  Text,
  ProgressViewIOS
} from 'react-native'

interface Props {
  downloading: boolean;
  progress: number;
  onDownloadingChange: (downloading: boolean) => void;
}

export default function OfflineMapControls(props: Props) {
  return (
    <View style={{ padding: 20 }}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <Text style={styles.labelText}>Download Offline Maps</Text>
        <Switch value={props.downloading} onValueChange={props.onDownloadingChange}/>
      </View>
      <Text style={styles.progressLabelText}>{Math.round(props.progress * 100)}% Complete</Text>
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
