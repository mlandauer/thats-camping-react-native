import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { View, Text } from 'react-native'
import CampsiteList from '../components/CampsiteList'
import { Event, Navigator } from 'react-native-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'

import { Campsite, Position } from '../libs/types'
import { State } from '../reducers'

interface Props {
  navigator?: Navigator;
  campsites: {[index: number]: Campsite};
  position: Position | null;
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
      <View style={{flex: 1}}>
        <PositionDisplay position={this.props.position} />
        <CampsiteList campsites={Object.values(this.props.campsites)} position={this.props.position} />
      </View>
    );
  }
}

interface PositionDisplayProps {
  position: (Position | null);
}

function PositionDisplay(props: PositionDisplayProps) {
  let text = "undefined"
  if(props.position) {
    text = (props.position as Position).lat.toString() + ", " +
      (props.position as Position).lng.toString()
  }
  return (
    <Text>Position: {text}</Text>
  )
}

function mapStateToProps(state: State, ownProps: {}) {
  return {
    campsites: state.campsites,
    position: state.position
  };
}

export default connect(mapStateToProps)(CampsiteIndexScreen)
