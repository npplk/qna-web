#!/bin/bash
# Stop all servers and start the server
echo "$PWD"
forever stopall
forever start -c "npm run start" ./