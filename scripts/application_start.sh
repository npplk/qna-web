#!/bin/bash
# Stop all servers and start the server
forever stopall
forever start -c "npm run start" /home/ubuntu/npp-qna-web/app.js