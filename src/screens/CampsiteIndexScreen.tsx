import * as React from 'react'
import {
  View,
  FlatList,
  StyleSheet
} from 'react-native'
import { connect, Dispatch } from 'react-redux'
import CampsiteListItem from '../components/CampsiteListItem'
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

  renderItem(campsite: Campsite) {
    return (
      <CampsiteListItem campsiteName={campsite.name} parkName={campsite.parkName} distance={1.0} bearing={180}/>
    )
  }

  _keyExtractor = (campsite: Campsite, index: number) => campsite.name;

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={Object.values(this.props.campsites)}
          renderItem={({item}) => this.renderItem(item)}
          keyExtractor={this._keyExtractor}
          ItemSeparatorComponent={Separator}
        />
      </View>
    );
  }
}

class Separator extends React.Component<any, any> {
  render() {
    return (
      <View style={styles.separator} />
    )
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: "#CED0CE",
  }
})

function mapStateToProps(state: State, ownProps: {}) {
  return {
    campsites: state.campsites
  };
}

export default connect(mapStateToProps)(CampsiteIndexScreen)
