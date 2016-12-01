#!/bin/sh
cd /root
apt install -y git docker.io
git clone https://github.com/atomney/remindme
cd /root/remindme
chmod +x remindme.sh
bash remindme.sh --install
