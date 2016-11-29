#!/bin/sh
export DEBIAN_FRONTEND=noninteractive;
cd /root/
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/testing multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list
apt update -y
apt upgrade -y
apt install -y git nodejs mongodb-org
npm install -g npm@latest
npm install -g nodemon
service mongod start
git clone https://github.com/nubzoar/remindme
cd remindme/
npm install
nodemon
