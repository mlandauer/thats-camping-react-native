import * as renderer from 'react-test-renderer'
import * as React from 'react'

import About from '../../components/About'

it('renders correctly', () => {
  const tree = renderer.create(
    <About />
  ).toJSON();
  expect(tree).toMatchSnapshot()
})
