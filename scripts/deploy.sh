#!/bin/bash
brew update
brew cask install fastlane
$HOME/.fastlane/bin/fastlane beta
