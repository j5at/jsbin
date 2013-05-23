#!/bin/bash

cd ..

ln -sfh $(pwd) /usr/local/bin/jsbin
npm install
cp config.default.json /usr/local/etc/jsbin.config.local.json

cd service

cp com.jsbin.plist /Library/LaunchDaemons/com.jsbin.plist

launchctl load /Library/LaunchDaemons/com.jsbin.plist

echo "JSBin server should be started on port 30303"
echo "edit /usr/local/etc/jsbin.config.local.json to set configuration properties"
echo "particularly, make sure url.host is set to the hostname you'll use to access jsbin"