# TRIVIA!

[![Netlify Status](https://api.netlify.com/api/v1/badges/a4f6ad39-0d16-4185-8341-87645ad1eec5/deploy-status)](https://app.netlify.com/sites/apptrivia/deploys)

Real time Trivia app using Express + React + Socket.io + Yarn workspaces + MongoDB

## ✨ Features
- Realtime with Socket.IO
- Ligthing fast React UI
- Authentication with Auth0
- Pretty fun!

## 🚀 Yarn workspaces
[Yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) is an awesome feature, it's easy to keep everything together.

**Install NPM packages**

```bash
# Install packages for React
yarn workspace client add package-name
```

```bash
# Install packages for Express Backend
yarn workspace server add package-name
```

## 🏃‍♀️ How to run

Run the API server and React server with a single command

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
