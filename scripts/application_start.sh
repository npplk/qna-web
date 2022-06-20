#!/bin/bash

# Stop all servers and start the server
cd /home/ubuntu/npp-qna-web
pm2 stop npp-qna-web
# forever stopall
# forever start -c "yarn run start" ./
pm2 start yarn --name npp-qna-web -- start