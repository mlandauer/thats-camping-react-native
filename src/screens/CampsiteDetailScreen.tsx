import * as React from 'react'
import { connect, Dispatch } from 'react-redux'

import { Campsite, CampsiteWithStarred } from '../libs/types'
import CampsiteDetail from '../components/CampsiteDetail'
import { State } from '../ducks'
import { toggleStarredCampsite } from '../ducks/starred'
import convertToCampsiteWithStarred from '../libs/convertToCampsiteWithStarred'

interface Props {
  campsite: CampsiteWithStarred;
  onStarToggled: () => void;
  // Passed by the parent screen
  id: number;
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

const mapDispatchToProps = (dispatch: Dispatch<State>, ownProps: {id: number}) => {
  return {
    onStarToggled: () => {
      dispatch(toggleStarredCampsite(ownProps.id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CampsiteDetailScreen)
