#!/bin/bash
# Install node.js and Forever.js
apt-get update
apt-get install nodejs -y
apt-get install npm  -y
npm install forever -g