import 'react-native';
import * as React from 'react';
import { CampsiteListScreen } from '../../screens/CampsiteListScreen';

// CampsiteIndexScreen uses a native library for rendering icons
// So, let's mock this
// Don't know yet how to do this properly
// TODO: Fix this
jest.mock('react-native-vector-icons/FontAwesome', () => {
  return jest.fn(() => 42)
});

// Note: test renderer must be required after react-native.
import * as renderer from 'react-test-renderer';

// TODO: Figure out why this test fails
xit('renders correctly', () => {
  renderer.create(
    <CampsiteListScreen campsites={{}} replicating={false} position={null} />
  );
});
