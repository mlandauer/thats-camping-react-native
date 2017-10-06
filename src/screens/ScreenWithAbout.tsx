import * as React from 'react'
import { Event, Navigator } from 'react-native-navigation'
import Icon from 'react-native-vector-icons/Ionicons'
import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge'

interface NProps {
  navigator?: Navigator;
  tracker?: GoogleAnalyticsTracker;
}

export default class ScreenWithAbout<U, V> extends React.Component<U & NProps, V> {
  constructor(props: U & NProps) {
    super(props);
    // The navigator prop isn't necessarily set when we run tests
    if (this.props.navigator) {
      this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }
  }

  componentDidMount() {
    // HACK HACK Temporary workaround for not figuring out how to mock out Icon for testing
    // Just set it to undefined for the time being during testing
    if (Icon) {
      // TODO: Use a different icon on Android
      Icon.getImageSource('ios-help-circle-outline', 22).then((about: any) => {
        if (this.props.navigator) {
          this.props.navigator.setButtons({
            rightButtons: [
              { id: 'about', icon: about }
            ]
          })
        }
      })
    }
  }

  onNavigatorEvent(event: Event) {
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'about') {
        if (this.props.navigator) {
          if (this.props.tracker) {
            this.props.tracker.trackScreenView("About")
          }
          this.props.navigator.push({
            screen: 'thatscamping.AboutScreen',
            title: 'About',
            backButtonTitle: 'Back'
          });
        }
      }
    }
  }
}
