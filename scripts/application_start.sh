#!/bin/bash

# Stop all servers and start the server
cd /home/ubuntu/npp-qna-web
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads 
pm2 stop npp-qna-web
pm2 delete npp-qna-web
# forever stopall
# forever start -c "yarn run start" ./
pm2 start yarn --name npp-qna-web -- start