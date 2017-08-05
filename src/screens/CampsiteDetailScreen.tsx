import * as React from 'react'
import { connect, Dispatch } from 'react-redux'

import { CampsiteWithStarred } from '../libs/types'
import { State } from '../ducks'
import { toggleStarredCampsite } from '../ducks/starred'
import convertToCampsiteWithStarred from '../libs/convertToCampsiteWithStarred'
import CampsiteDetail from '../components/CampsiteDetail'

interface Props {
  campsite: CampsiteWithStarred;
  onStarToggled: () => void;
  // Passed by the parent screen
  id: string;
}

export class CampsiteDetailScreen extends React.Component<Props, {}> {
  static navigatorStyle = {
    tabBarHidden: true
  }

  render() {
    return (
      <CampsiteDetail campsite={this.props.campsite} onStarToggled={this.props.onStarToggled} />
    )
  }
}

function mapStateToProps(state: State, ownProps: {id: string}) {
  let campsite = convertToCampsiteWithStarred(state.campsites[ownProps.id], state.starred)
  return {
    campsite: campsite
  }
}

const mapDispatchToProps = (dispatch: Dispatch<State>, ownProps: {id: string}) => {
  return {
    onStarToggled: () => {
      dispatch(toggleStarredCampsite(ownProps.id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CampsiteDetailScreen)
