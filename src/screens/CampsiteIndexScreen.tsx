import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import CampsiteList from '../components/CampsiteList'
import { Event, Navigator } from 'react-native-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'

import { Campsite } from '../libs/types'
import { State } from '../reducers'

interface Props {
  navigator?: Navigator;
  campsites: {[index: number]: Campsite};
  dispatch: Dispatch<State>
}

export class CampsiteIndexScreen extends React.Component<Props, {}> {
  constructor(props: Props) {
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
      Icon.getImageSource('info-circle', 20).then((about: any) => {
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
          this.props.navigator.push({
            screen: 'thatscamping.AboutScreen',
            title: 'About'
          });
        }
      }
    }
  }

  render() {
    return (
      <CampsiteList campsites={this.props.campsites} />
    );
  }
}

function mapStateToProps(state: State, ownProps: {}) {
  return {
    campsites: state.campsites
  };
}

export default connect(mapStateToProps)(CampsiteIndexScreen)
