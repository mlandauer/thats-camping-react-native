import * as React from 'react'

import { CampsiteWithStarred } from '../libs/types'
import CampsiteDetail from '../components/CampsiteDetail'

interface Props {
  campsite: CampsiteWithStarred;
  onStarToggled: () => void;
}

export default class CampsiteDetailScreen extends React.Component<Props, {}> {
  render() {
    return (
      <CampsiteDetail campsite={this.props.campsite} onStarToggled={this.props.onStarToggled} />
    )
  }
}
