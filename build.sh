#!/bin/sh

# Install dependencies
npm ci

# Bundle the action using webpack
npx webpack --config webpack.config.js
