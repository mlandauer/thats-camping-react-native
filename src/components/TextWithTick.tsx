import * as React from 'react'
import {
  Text,
  View,
  StyleSheet,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

interface Props {
  value: boolean | null;
  children: string | null;
}

export default function TextWithTick(props: Props) {
  var icon: string
  switch (props.value) {
    case true:
      icon = "ios-checkmark"
      break
    case false:
      icon = "ios-close"
      break
    default:
      icon = "ios-help"
      break
  }
  if (props.children) {
    return (
      <View style={{flexDirection: 'row'}}>
        <Icon style={styles.icon} name={icon} />
        <Text style={styles.list}>{props.children}</Text>
      </View>
    )
  } else {
    return null
  }
}

const styles = StyleSheet.create({
  icon: {
    fontSize: 26,
    marginRight: 10
  },
  list: {
    fontSize: 20,
    marginBottom: 10,
    flex: 1
  }
})
