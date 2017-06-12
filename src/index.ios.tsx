import * as React from 'react';
import { AppRegistry } from 'react-native';
import CampsiteList from './components/CampsiteList'
import About from './components/About'

export default class ThatsCamping extends React.Component<{}, {}> {
  render() {
    return (
      <About/>
    );
  }
}

AppRegistry.registerComponent('ThatsCamping', () => ThatsCamping);
