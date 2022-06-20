#!/bin/bash
# Install node.js and Forever.js
apt-get update
# apt-get install nodejs -y
# apt-get install npm  -y
curl -sL https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.0/install.sh -o install_nvm.sh
bash install_nvm.sh
source ~/.bashrc
source ~/.nvm/nvm.sh
nvm install --lts
npm install forever -g