# TRIVIA!
Trivia app using Express + React + Socket.io + Yarn workspaces

## ✨ Features
- Realtime with Socket.IO
- Ligthing fasht React UI
- Authentication with Auth0
- Pretty fun!

## 🚀 Yarn workspaces
[Yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) is an awesome feature, it's easy to keep everithing together.

**Install NPM packages**

```bash
# Install packages for React
yarn workspace client add package-name
```

```bash
# Install packages for Backend
yarn workspace server add package-name
```

## 🏃‍♀️ How to run
```bash
# With yarn
yarn start
```

```bash
# With npm
npm run start
```

**Running server in production:**
Install PM2

```bash
npm install pm2 -g
```
Start server daemon using included config file

```bash
pm2 start ecosystem.config.js
```
