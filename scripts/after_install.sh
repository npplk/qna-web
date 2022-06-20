
#!/bin/bash

# rm -rf /home/ubuntu/npp-qna-web
# mkdir /home/ubuntu/npp-qna-web
npm install --location=global yarn
cd /home/ubuntu/npp-qna-web
yarn install
yarn run build