# React Calculator Application

## Repository Link 
`https://github.com/Sangita1992/react_cal_app`

[![Deploy to GitHub Pages](https://github.com/Sangita1992/react_cal_app/actions/workflows/deploy.yml/badge.svg)](https://github.com/Sangita1992/react_cal_app/actions/workflows/deploy.yml)

## Overview

This project sets up a complete **CI/CD pipeline** for a **React-based Calculator Application**, leveraging **Docker** for local development and **GitHub Actions** for automated deployment to **GitHub Pages**. The goal is to containerize the app for development with hot reloading and automate its deployment process.

---

## Learning Objectives

- Containerize the react calculator app with Docker and enable hot reload
- Automate build and deployment using GitHub Actions
- Host the app on GitHub Pages
- Follow DevOps best practices for workflow and documentation

---

## Technology Stack

- React (Vite)
- Docker
- GitHub Actions
- GitHub Pages


### Getting Started 

1. Manually created repository on Github (react_cal_app)
2. push the react calculator code into github repository via terminal with message `initial commit`.


## Docker Setup

1. manually created `Dockerfile.dev`

   ```dockerfile
   # Dockerfile.dev
   FROM node:18-alpine
   WORKDIR /app
   COPY package.json package-lock.json ./
   RUN npm install
   COPY . .
   EXPOSE 5173
   CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
2. manually created `compose.yml` and updated as follow:
  #compose.yml
   version: '3.8'
   services:
   react_calculator:
      build:
         context: .
         dockerfile: Dockerfile.dev
      container_name: react_calculator_app
      ports:
         - "5173:5173"
      volumes:
         - .:/app
         - /app/node_modules
      environment:
         - NODE_ENV=development

## Deployment on Github
   1. Manually created folders & file `.github` > `workflows`> `deploy.yml`
   2. update `deploy.yml` as follows:
      #name of overall action
      name: Deploy to GitHub Pages

      #on defines WHEN the action(s) will run
      on: 
         push:
            branches: [main]
         workflow_dispatch: 

      #permission grant to image runner the ability to read/write files
      permissions: 
         contents: read
         pages: write
         id-token: write

      concurrency:
         group: "pages"
         cancel-in-progress: true

      jobs: 
         build:
            runs-on: ubuntu-22.04
            steps:
                  - name: Checkout Repository
                  uses: actions/checkout@v4

                  - name: Setup Node
                  uses: actions/setup-node@v4
                  with:
                     node-version: 18
                     cache: 'npm'

                  - name: Install dependencies
                  run: npm install

                  - name: Build Application
                  run: npm run build

                  - name: Upload artifact
                  uses: actions/upload-pages-artifact@v3
                  with:
                     path: ./dist


         deploy:
            needs: build
            runs-on: ubuntu-22.04
            environment: 
                  name : github-pages
                  url: ${{ steps.deployment.outputs.page_url }}

            steps:
                  - name: Deploy to GitHub Pages
                  id: deployment
                  uses: actions/deploy-pages@v4
3. add homepage URL`https://Sangita1992.github.io/react_cal_app` into `package.json` 
4. add base path `/react_cal_app/` & `server` field into `vite.config.js`
5. made commit with message `Add CI/CD deployment` & push into github.

### Enabling GitHub Pages
   1. In react_cal_app repository settings, navigate to "Pages" section & select "Github Actions" under "Build and Deployment."
   2. Re-run the github action, which automate the deployment and generated deployment link `https://sangita1992.github.io/react_cal_app/` 



