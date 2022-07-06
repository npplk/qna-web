
#!/bin/bash

# rm -rf /home/ubuntu/npp-qna-web
# mkdir /home/ubuntu/npp-qna-web
cd /home/ubuntu/npp-qna-web
# yarn install
# yarn run build
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads 
npm install
export SITE_NAME=ec2-13-213-51-67.ap-southeast-1.compute.amazonaws.com
npm run build