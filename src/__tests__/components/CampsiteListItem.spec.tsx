import * as renderer from 'react-test-renderer'
import * as React from 'react'

import CampsiteListItem from '../../components/CampsiteListItem'

it('renders correctly', () => {
  const tree = renderer.create(
    <CampsiteListItem campsiteName="Lovely campsite" parkName="Peaceful area" starred={false} distance={1000} bearing={180}/>
  ).toJSON();
  expect(tree).toMatchSnapshot()
})
