import * as React from 'react'
import { View } from 'react-native'
import Markdown from 'react-native-simple-markdown'

import { Campsite } from '../libs/types'

interface Props {
  campsite: Campsite;
}

export default class CampsiteDetailScreen extends React.Component<Props, {}> {
  render() {
    return (
      <View style={{padding: 20}}>
        <Markdown>
          This is a campsite detail page for id {this.props.campsite.id}
        </Markdown>
      </View>
    )
  }
}
