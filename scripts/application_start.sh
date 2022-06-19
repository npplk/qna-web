#!/bin/bash
# Stop all servers and start the server
cd /home/ubuntu/npp-qna-web
forever stopall
forever start -c "npm run start" ./