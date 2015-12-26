#!/bin/bash

echo "launching emulator"
emulator -avd reactnative &

read

echo "running dev server"
react-native start &

react-native run-android
