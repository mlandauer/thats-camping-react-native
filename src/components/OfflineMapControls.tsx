import * as React from 'react'
import {
  View,
  StyleSheet,
  Switch,
  Text
} from 'react-native'

interface Props {
  downloading: boolean;
  onDownloadingChange: (downloading: boolean) => void;
}

export default function OfflineMapControls(props: Props) {
  return (
    <View style={{ padding: 20 }}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <Text style={styles.labelText}>Download Offline Maps</Text>
        <Switch value={props.downloading} onValueChange={props.onDownloadingChange}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  labelText: {
    fontSize: 18,
    color: '#777'
  }
})
