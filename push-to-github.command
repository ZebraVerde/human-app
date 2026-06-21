#!/bin/bash
cd "$(dirname "$0")"

echo "Cleaning up..."
rm -f .git/index.lock

git config user.email "zebra.verde.dsn@gmail.com"
git config user.name "ZebraVerde"

git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/ZebraVerde/human-app.git 2>/dev/null || git remote set-url origin https://github.com/ZebraVerde/human-app.git

echo ""
echo "Pushing to GitHub..."
echo "Username: ZebraVerde"
echo "Password: paste your Personal Access Token (github.com → Settings → Developer settings → Personal access tokens → Tokens classic → Generate new → check repo → copy)"
echo ""
git push -u origin main

echo ""
echo "Done! Check github.com/ZebraVerde/human-app"
read -p "Press Enter to close..."
