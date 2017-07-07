[![Build Status](https://travis-ci.org/mlandauer/thats-camping-react-native.svg?branch=master)](https://travis-ci.org/mlandauer/thats-camping-react-native)

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

## Continuous deployment

To get continuous deployment all working on travis-ci there's already a `.travis.yml` file ready configured. However, travis needs the ability to access the iTunes Connect account. So, you need to give it the credentials via the following environment variables:
* `FASTLANE_PASSWORD`
* `FASTLANE_SESSION`
* `FASTLANE_APPLE_APPLICATION_SPECIFIC_PASSWORD`

### `FASTLANE_PASSWORD`

This is simply the password for my Apple ID `mlandauer@gmail.com`.

### `FASTLANE_SESSION`
This is required because I have two factor authentication switched on. To generate the value for this run the following locally:
```
fastlane spaceauth -u mlandauer@gmail.com
```

### `FASTLANE_APPLE_APPLICATION_SPECIFIC_PASSWORD`
To generate the value for this visit [appleid.apple.com/account/manage](https://appleid.apple.com/account/manage) and generate a new application specific password.

## Copyright & License

Copyright Matthew Landauer. Licensed under the GPL v3. See LICENSE.md for more details.
