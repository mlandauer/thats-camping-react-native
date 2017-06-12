import * as React from 'react'
import { View } from 'react-native'
import Markdown from 'react-native-simple-markdown'

// TODO: Add version number of app here
// TODO: Update wording to match elm version of the app

export default class About extends React.Component<{},{}> {
  render() {
    return (
      <View style={{padding: 30}}>
        <Markdown>
         # About That's Camping{'\n\n'}

         Find campsites near you in New South Wales, Australia.
         It covers camping on public, common land such as National Parks,
         State Forests and Local Council land.{'\n\n'}

         It works **completely offline**, even when you're
         far far away from a mobile phone tower. When does that ever happen
         while camping?{'\n\n'}

         Made by [Matthew Landauer](https://twitter.com/matthewlandauer). It's free and [open source](https://github.com/mlandauer/thats-camping-react-native) because that's the way it ought to be.{'\n\n'}

         ## Things you might want to do{'\n\n'}

         [Suggest a **feature** or report an **issue**](https://github.com/mlandauer/thats-camping-react/issues)
        </Markdown>
      </View>
    )
  }
}
