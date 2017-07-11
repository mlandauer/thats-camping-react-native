import * as React from 'react'
import { connect, Dispatch } from 'react-redux'

import { Campsite, CampsiteWithStarred } from '../libs/types'
import CampsiteDetail from '../components/CampsiteDetail'
import { State } from '../ducks'
import convertToCampsiteWithStarred from '../libs/convertToCampsiteWithStarred'

interface Props {
  campsite: CampsiteWithStarred;
  dispatch: Dispatch<State>
  // Passed by the parent screen
  id: number;
  // TODO: Handle this callback here
  onStarToggled: () => void;
}

export class CampsiteDetailScreen extends React.Component<Props, {}> {
  render() {
    return (
      <CampsiteDetail campsite={this.props.campsite} onStarToggled={this.props.onStarToggled} />
    )
  }
}

function mapStateToProps(state: State, ownProps: {id: number}) {
  let campsite = convertToCampsiteWithStarred(state.campsites[ownProps.id], state.starred)
  return {
    campsite: campsite
  }
}

export default connect(mapStateToProps)(CampsiteDetailScreen)
