#!/bin/bash

echo "launching emulator"
emulator -avd reactnative &

read
fuser -k -n tcp 8081
adb reverse tcp:8081 tcp:8081


echo "running dev server"
react-native start &

react-native run-android
