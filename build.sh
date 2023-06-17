#!/bin/sh

# Install dependencies
npm ci

# Install webpack-node-externals
npm install webpack-node-externals

# Bundle the action using webpack
npx webpack --config webpack.config.js
