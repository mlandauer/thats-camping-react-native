[![Build Status](https://travis-ci.org/mlandauer/thats-camping-react-native.svg?branch=master)](https://travis-ci.org/mlandauer/thats-camping-react-native)
[![Stories in Ready](https://badge.waffle.io/mlandauer/thats-camping-react-native.png?label=ready&title=Ready)](http://waffle.io/mlandauer/thats-camping-react-native)

# It's raining and my Weet-Bix is wet. That's Camping!

Find campsites near you in New South Wales, Australia. It covers camping on
public, common land such as National Parks, State Forests and Local Councils.

This is a [React Native](https://facebook.github.io/react-native/) application
written in [Typescript](http://www.typescriptlang.org/). It's currently only
really been worked on for iOS though adding Android support shouldn't be too
much trouble.

The app also uses [PouchDB](https://pouchdb.com/)/[CouchDB](http://couchdb.apache.org/)
to work offline.

When a network is available any updates from the main database are automatically
synched back to the local database and are reflected in the user interface in
real time.

The next step is to add the ability for the user to edit and add new campsites!
This will again even work when offline.

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

## Thank you

The "That's Camping!" icon design by [Gabriel Clark](http://www.gabrielclark.com.au/)
and [Joanna Hill](https://twitter.com/jojohill).

## Copyright & License

Copyright Matthew Landauer. Licensed under the GPL v3. See LICENSE.md for more details.
