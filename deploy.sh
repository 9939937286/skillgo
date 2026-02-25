#!/bin/bash

echo "🚀 Auto Deploy Started..."

cd /root/skillgo || exit

echo "📥 Pulling Latest Code..."
git pull origin main

echo "📦 Installing Dependencies..."
npm install

echo "♻️ Restarting PM2..."
pm2 restart skillgo

echo "✅ Deploy Complete"
