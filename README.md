# That's Camping

## Development

First install nvm. Then,

```
nvm use
yarn
react-native run-ios
tsc --watch
```

To run tests

```
nvm use
npm run test
```

## Deploy beta version

We're using [fastlane](https://fastlane.tools/) to ease deployment of new versions. For beta testing we're currently using [TestFlight](https://developer.apple.com/testflight/).

To install fastlane
```
bundle install
```

To deploy a new version of the beta for iOS

```
fastlane beta
```
