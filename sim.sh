cd ./simulator
npx concurrently --kill-others "yarn start:main" "yarn start:renderer"

