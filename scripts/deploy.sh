#!/bin/bash
brew cask install fastlane
yarn install
$HOME/.fastlane/bin/fastlane beta --verbose
