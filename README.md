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

## Production

I'm moving rapidly towards releasing this on the Apple app store. I will be
charging a small amount of money for this app. This is to support future
development of this app.

Please be decent. Don't just fork the app and re-release on the app store.
As long as you abide by the terms of the open-source license, yes, you can do
this perfectly legally. However, I'm asking you not to, to respect the spirit
in which this code was open-sourced.

## Thank you

The "That's Camping!" icon design by [Gabriel Clark](http://www.gabrielclark.com.au/)
and [Joanna Hill](https://twitter.com/jojohill).

## Copyright & License

Copyright Matthew Landauer. Licensed under the GPL v3. See LICENSE.md for more details.
