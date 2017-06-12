import 'react-native';
import * as React from 'react';
import CampsiteIndexScreen from '../../screens/CampsiteIndexScreen';

// Note: test renderer must be required after react-native.
import * as renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <CampsiteIndexScreen />
  );
});
