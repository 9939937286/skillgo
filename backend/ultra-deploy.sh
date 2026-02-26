#!/bin/bash
cd /root/skillgo/backend
git pull origin main
pm2 restart skillgo-server
echo Ultra Deploy Done
