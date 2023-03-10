#!/bin/bash

# Install node.js and Forever.js
# apt-get update
# apt-get install nodejs -y
# apt-get install npm  -y
cd /home/ubuntu
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads 
pm2 stop npp-qna-web
pm2 delete npp-qna-web
rm -rf npp-qna-web
# curl -sL https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.0/install.sh -o install_nvm.sh
# bash install_nvm.sh
# export NVM_DIR="$HOME/.nvm"
# [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  
# [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  
# nvm install --lts
# npm install --location=global yarn
# yarn global add pm2