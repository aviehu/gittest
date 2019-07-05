#!/bin/bash
echo "starting servers"
NODE_ENV=production node api/src/index.js &
cd client && node dist/app/app-server/index.js
