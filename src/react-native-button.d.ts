declare module "react-native-button" {
  import { ViewStyle, TextStyle } from 'react-native'

  // TODO: Add all of the supported props
  interface Props {
    containerStyle?: ViewStyle;
    style?: TextStyle;
    onPress: () => void;
  }

  export default class Button extends React.Component<Props, {}> {
  }
}
