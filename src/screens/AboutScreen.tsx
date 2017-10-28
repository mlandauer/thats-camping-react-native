import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { Alert } from 'react-native'
import { Navigator } from 'react-native-navigation'

import About from '../components/About'
import * as Database from '../libs/Database'
import { State } from '../ducks'
import * as Admin from '../ducks/admin'

interface Props {
  navigator: Navigator;
  adminText: string;
  onAdminTextChanged: (text: string) => void;
}

export class AboutScreen extends React.Component<Props, {}> {
  static navigatorStyle = {
    tabBarHidden: true
  }

  async destroyDatabase() {
    await Database.destroy()
    Alert.alert("Database destroyed")
  }

  render() {
    return (
      <About onDestroyButtonPushed={() => this.destroyDatabase()} adminText={this.props.adminText} onAdminTextChanged={this.props.onAdminTextChanged}/>
    )
  }
}

function mapStateToProps(state: State) {
  return {
    adminText: state.admin.text
  }
}

const mapDispatchToProps = (dispatch: Dispatch<State>) => {
  return {
    onAdminTextChanged: (text: string) => {
      dispatch(Admin.updateText(text))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutScreen)
