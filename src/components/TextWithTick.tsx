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
  if (props.children) {
    return (
      <View style={{flexDirection: 'row'}}>
        <TickIcon value={props.value} />
        <Text style={styles.list}>{props.children}</Text>
      </View>
    )
  } else {
    return null
  }
}

function TickIcon(props: {value: boolean | null}) {
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
  return (
    <Icon style={styles.icon} name={icon} />
  )
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
