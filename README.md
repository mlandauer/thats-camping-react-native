[![Build Status](https://travis-ci.org/mlandauer/thats-camping-react-native.svg?branch=master)](https://travis-ci.org/mlandauer/thats-camping-react-native)

# That's Camping

## Development

```
cp env.example .env
```
Then edit values in .env

Install nvm. Then,

```
nvm use
yarn
react-native run-ios
npm run tsc
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
bundle exec fastlane beta
```

## Continuous deployment

To get continuous deployment all working on travis-ci there's already a `.travis.yml` file ready configured. However, travis needs the ability to access the iTunes Connect account.

So far I haven't been able to get things working with two-factor authentication. So,
that needs to be switched off for the time being.

You need to give fastlane credentials via the following environment variables:
* `FASTLANE_PASSWORD`
* `MATCH_PASSWORD`

### `FASTLANE_PASSWORD`

This is simply the password for my Apple ID `mlandauer@gmail.com`.

### `MATCH_PASSWORD`

This is the password used to encrypt the certificates at https://github.com/mlandauer/certificates.

## Copyright & License

Copyright Matthew Landauer. Licensed under the GPL v3. See LICENSE.md for more details.
