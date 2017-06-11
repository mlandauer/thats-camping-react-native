import * as React from 'react';
import { AppRegistry } from 'react-native';
import CampsiteList from './components/CampsiteList'

export default class ThatsCamping extends React.Component<{}, {}> {
  render() {
    return (
      <CampsiteList/>
    );
  }
}

AppRegistry.registerComponent('ThatsCamping', () => ThatsCamping);
